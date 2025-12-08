import cx from 'classnames'
import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { useFirstRender } from '../hooks/useFirstRender'
import { CellComponent, CellProps, Column } from '../types'

type KoreanTextColumnOptions<T> = {
  placeholder?: string
  alignRight?: boolean
  disabled?: boolean
  // When true, data is updated as the user types, otherwise it is only updated on blur. Default to true
  continuousUpdates?: boolean
  // Value to use when deleting the cell
  deletedValue?: T
  // Parse what the user types
  parseUserInput?: (value: string) => T
  // Format the value of the input when it is blurred
  formatBlurredInput?: (value: T) => string
  // Format the value of the input when it gets focused
  formatInputOnFocus?: (value: T) => string
  // Format the value when copy
  formatForCopy?: (value: T) => string
  // Parse the pasted value
  parsePastedValue?: (value: string) => T
}

type KoreanTextColumnData<T> = {
  placeholder?: string
  alignRight: boolean
  disabled: boolean
  continuousUpdates: boolean
  parseUserInput: (value: string) => T
  formatBlurredInput: (value: T) => string
  formatInputOnFocus: (value: T) => string
}

const KoreanTextComponent = React.memo<
  CellProps<string | null, KoreanTextColumnData<string | null>>
>(
  ({
    active,
    focus,
    rowData,
    setRowData,
    columnData: {
      placeholder,
      alignRight,
      disabled,
      formatInputOnFocus,
      formatBlurredInput,
      parseUserInput,
      continuousUpdates,
    },
  }) => {
    const ref = useRef<HTMLInputElement>(null)
    const firstRender = useFirstRender()

    // We create refs for async access so we don't have to add it to the useEffect dependencies
    const asyncRef = useRef({
      rowData,
      formatInputOnFocus,
      formatBlurredInput,
      setRowData,
      parseUserInput,
      continuousUpdates,
      firstRender,
      // Timestamp of last focus (when focus becomes true) and last change (input change)
      // used to prevent un-necessary updates when value was not changed
      focusedAt: 0,
      changedAt: 0,
      // This allows us to keep track of whether or not the user blurred the input using the Esc key
      // If the Esc key is used we do not update the row's value (only relevant when continuousUpdates is false)
      escPressed: false,
    })
    asyncRef.current = {
      rowData,
      formatInputOnFocus,
      formatBlurredInput,
      setRowData,
      parseUserInput,
      continuousUpdates,
      firstRender,
      // Keep the same values across renders
      focusedAt: asyncRef.current.focusedAt,
      changedAt: asyncRef.current.changedAt,
      escPressed: asyncRef.current.escPressed,
    }

    useLayoutEffect(() => {
      // When the cell gains focus we make sure to immediately select the text in the input:
      // - If the user gains focus by typing, it will replace the existing text, as expected
      // - If the user gains focus by clicking or pressing Enter, the text will be preserved and selected
      if (focus) {
        if (ref.current) {
          // Make sure to first format the input
          ref.current.value = asyncRef.current.formatInputOnFocus(
            asyncRef.current.rowData
          )
          ref.current.focus()
          ref.current.select()
        }

        // We immediately reset the escPressed
        asyncRef.current.escPressed = false
        // Save current timestamp
        asyncRef.current.focusedAt = Date.now()
      }
      // When the cell is active but not in focus mode, still focus the input for immediate typing
      else if (active) {
        if (ref.current) {
          // clear selection
          ref.current.selectionStart = 0
          ref.current.selectionEnd = 0

          // Format the input value
          ref.current.value = asyncRef.current.formatBlurredInput(
            asyncRef.current.rowData
          )
          // Use setTimeout to ensure focus happens after DataSheetGrid's mouse event handling
          setTimeout(() => {
            if (ref.current && active) {
              ref.current.focus()
            }
          }, 0)
          // Don't select text when just active (not in edit mode), so user can position cursor
        }
      }
      // When the cell looses focus (by pressing Esc, Enter, clicking away...) we make sure to blur the input
      // Otherwise the user would still see the cursor blinking
      else {
        if (ref.current) {
          // Update the row's value on blur only if the user did not press escape (only relevant when continuousUpdates is false)
          if (
            !asyncRef.current.escPressed &&
            !asyncRef.current.continuousUpdates &&
            !asyncRef.current.firstRender &&
            // Make sure that focus was gained more than 10 ms ago, used to prevent flickering
            asyncRef.current.changedAt >= asyncRef.current.focusedAt
          ) {
            asyncRef.current.setRowData(
              asyncRef.current.parseUserInput(ref.current.value)
            )
          }
          ref.current.blur()
        }
      }
    }, [focus, active])

    useEffect(() => {
      if (!focus && ref.current) {
        // On blur or when the data changes, format it for display
        ref.current.value = asyncRef.current.formatBlurredInput(rowData)
      }
    }, [focus, rowData])

    return (
      <input
        // We use an uncontrolled component for better performance
        defaultValue={formatBlurredInput(rowData)}
        className={cx('dsg-input', alignRight && 'dsg-input-align-right')}
        placeholder={active ? placeholder : undefined}
        disabled={disabled}
        // Important to prevent any undesired "tabbing"
        tabIndex={-1}
        ref={ref}
        // Make sure that while the cell is not active, the user cannot interact with the input
        // The cursor will not change to "I", the style of the input will not change,
        // and the user cannot click and edit the input (this part is handled by DataSheetGrid itself)
        style={{
          pointerEvents: focus ? 'auto' : 'none',
        // focus가 false면 커서(caret)를 가리기 위해 caretColor를 투명하게 설정
          caretColor: focus ? undefined : 'transparent',
        }}
        onChange={(e) => {
          asyncRef.current.changedAt = Date.now()

          // Only update the row's value as the user types if continuousUpdates is true
          if (continuousUpdates) {
            setRowData(parseUserInput(e.target.value))
          }
        }}
        onMouseDown={() => {
          // When clicking on the input, ensure it gets focus immediately
          // This helps when the cell becomes active via mouse click
          if (active && ref.current) {
            // Use setTimeout to ensure this happens after DataSheetGrid's event handling
            setTimeout(() => {
              if (ref.current && active) {
                ref.current.focus()
              }
            }, 0)
          }
        }}
        onKeyDown={(e) => {
          // Track when user presses the Esc key
          if (e.key === 'Escape') {
            asyncRef.current.escPressed = true
          }
        }}
      />
    )
  }
)

KoreanTextComponent.displayName = 'KoreanTextComponent'

export const koreanTextColumn = createKoreanTextColumn<string | null>()

export function createKoreanTextColumn<T = string | null>({
  placeholder,
  alignRight = false,
  disabled = false,
  continuousUpdates = true,
  deletedValue = null as unknown as T,
  parseUserInput = (value) => (value.trim() || null) as unknown as T,
  formatBlurredInput = (value) => String(value ?? ''),
  formatInputOnFocus = (value) => String(value ?? ''),
  formatForCopy = (value) => String(value ?? ''),
  parsePastedValue = (value) =>
    (value.replace(/[\n\r]+/g, ' ').trim() || (null as unknown)) as T,
}: KoreanTextColumnOptions<T> = {}): Partial<Column<T, KoreanTextColumnData<T>, string>> {
  return {
    component: KoreanTextComponent as unknown as CellComponent<T, KoreanTextColumnData<T>>,
    columnData: {
      placeholder,
      alignRight,
      disabled,
      continuousUpdates,
      formatInputOnFocus,
      formatBlurredInput,
      parseUserInput,
    },
    disabled: disabled,
    deleteValue: () => deletedValue,
    copyValue: ({ rowData }) => formatForCopy(rowData),
    pasteValue: ({ value }) => parsePastedValue(value),
    isCellEmpty: ({ rowData }) => rowData === null || rowData === undefined,
  }
}
