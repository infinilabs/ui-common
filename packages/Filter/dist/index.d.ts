import { ColorPickerProps as ColorPickerProps_2 } from 'antd';
import { ComponentProps } from 'react';
import { FC } from 'react';
import { InputProps as InputProps_2 } from 'antd';
import { JSX } from 'react/jsx-runtime';
import { MouseEvent as MouseEvent_2 } from 'react';
import { PropsWithChildren } from 'react';
import { SelectProps as SelectProps_2 } from 'antd';
import { Slider } from 'antd';

declare interface CheckboxGroupOption {
    label: string;
    value: string | number;
    icon: string;
    count: number;
}

declare interface CheckboxGroupProps extends CollapseProps {
    value: Array<string | number>;
    options: CheckboxGroupOption[];
    onChange?: (value: Array<string | number>) => void;
}

declare interface CollapseProps extends PropsWithChildren {
    defaultExpand?: boolean;
    title: string;
    onClear?: (event: MouseEvent_2) => void;
}

declare type ColorPickerProps = CollapseProps & ColorPickerProps_2;

export declare const FilterCheckboxGroup: FC<CheckboxGroupProps>;

export declare const FilterCollapse: FC<CollapseProps>;

export declare const FilterColorPicker: FC<ColorPickerProps>;

export declare const FilterInput: (props: InputProps) => JSX.Element;

export declare const FilterSelect: FC<SelectProps>;

export declare const FilterSlider: FC<SliderProps>;

export declare const FilterTags: FC<TagsProps>;

declare type InputProps = CollapseProps & InputProps_2;

declare type SelectProps = CollapseProps & SelectProps_2;

declare type SliderProps = CollapseProps & ComponentProps<typeof Slider>;

declare interface TagOption {
    label: string;
    value: string | number;
    icon?: string;
}

declare interface TagsProps extends CollapseProps {
    value: Array<string | number>;
    options: TagOption[];
    onChange?: (value: Array<string | number>) => void;
}

export { }
