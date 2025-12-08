import { Column } from '../types';
type KoreanTextColumnOptions<T> = {
    placeholder?: string;
    alignRight?: boolean;
    disabled?: boolean;
    continuousUpdates?: boolean;
    deletedValue?: T;
    parseUserInput?: (value: string) => T;
    formatBlurredInput?: (value: T) => string;
    formatInputOnFocus?: (value: T) => string;
    formatForCopy?: (value: T) => string;
    parsePastedValue?: (value: string) => T;
};
type KoreanTextColumnData<T> = {
    placeholder?: string;
    alignRight: boolean;
    disabled: boolean;
    continuousUpdates: boolean;
    parseUserInput: (value: string) => T;
    formatBlurredInput: (value: T) => string;
    formatInputOnFocus: (value: T) => string;
};
export declare const koreanTextColumn: Partial<Column<string | null, KoreanTextColumnData<string | null>, string>>;
export declare function createKoreanTextColumn<T = string | null>({ placeholder, alignRight, disabled, continuousUpdates, deletedValue, parseUserInput, formatBlurredInput, formatInputOnFocus, formatForCopy, parsePastedValue, }?: KoreanTextColumnOptions<T>): Partial<Column<T, KoreanTextColumnData<T>, string>>;
export {};
//# sourceMappingURL=koreanTextColumn.d.ts.map