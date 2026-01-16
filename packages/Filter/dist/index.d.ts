import { ColorPickerProps } from 'antd';
import { ComponentProps } from 'react';
import { FC } from 'react';
import { InputProps } from 'antd';
import { JSX as JSX_2 } from 'react/jsx-runtime';
import { MouseEvent as MouseEvent_2 } from 'react';
import { PropsWithChildren } from 'react';
import { SelectProps } from 'antd';
import { Slider } from 'antd';

export declare const FilterCheckboxGroup: FC<FilterCheckboxGroupProps>;

declare interface FilterCheckboxGroupOption {
    label: string;
    value: string | number;
    icon?: string;
    count: number;
}

declare interface FilterCheckboxGroupProps extends FilterCollapseProps {
    value: Array<string | number>;
    options: FilterCheckboxGroupOption[];
    i18n?: {
        labels?: {
            more?: string;
        };
    };
    classNames?: {
        title?: string;
        icon?: string;
        label?: string;
        count?: string;
        more?: string;
    };
    onChange?: (value: Array<string | number>) => void;
}

export declare const FilterCollapse: FC<FilterCollapseProps>;

declare interface FilterCollapseProps extends PropsWithChildren {
    defaultExpand?: boolean;
    title: string;
    classNames?: {
        title?: string;
    };
    onClear?: (event: MouseEvent_2) => void;
}

export declare const FilterColorPicker: FC<FilterColorPickerProps>;

declare type FilterColorPickerProps = FilterCollapseProps & ColorPickerProps & {
    i18n?: {
        labels?: {
            presetColors?: string;
        };
    };
};

export declare const FilterInput: (props: FilterInputProps) => JSX_2.Element;

declare type FilterInputProps = FilterCollapseProps & InputProps;

export declare const FilterSelect: FC<FilterSelectProps>;

declare type FilterSelectProps = FilterCollapseProps & SelectProps;

export declare const FilterSlider: FC<FilterSliderProps>;

declare type FilterSliderProps = FilterCollapseProps & ComponentProps<typeof Slider>;

declare interface FilterTagOption {
    label: string;
    value: string | number;
    icon?: string;
}

export declare const FilterTags: FC<FilterTagsProps>;

declare interface FilterTagsProps extends FilterCollapseProps {
    value: Array<string | number>;
    options: FilterTagOption[];
    classNames?: {
        title?: string;
        tag?: string;
        icon?: string;
    };
    onChange?: (value: Array<string | number>) => void;
}

export { }
