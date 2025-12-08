import cx from 'classnames'
import React, { FC } from 'react'

export const Cell: FC<{
  gutter: boolean
  stickyRight: boolean
  stickyLeft?: boolean
  disabled?: boolean
  className?: string
  active?: boolean
  children?: any
  width: number
  left: number
  gutterWidth?: number
}> = ({
  children,
  gutter,
  stickyRight,
  stickyLeft,
  active,
  disabled,
  className,
  width,
  left,
  gutterWidth,
}) => {
  return (
    <div
      className={cx(
        'dsg-cell',
        gutter && 'dsg-cell-gutter',
        disabled && 'dsg-cell-disabled',
        gutter && active && 'dsg-cell-gutter-active',
        stickyRight && 'dsg-cell-sticky-right',
        stickyLeft && 'dsg-cell-sticky-left',
        className
      )}
      style={{
        width,
        left: stickyRight ? undefined : stickyLeft && gutterWidth !== undefined ? gutterWidth : left,
      }}
    >
      {children}
    </div>
  )
}
