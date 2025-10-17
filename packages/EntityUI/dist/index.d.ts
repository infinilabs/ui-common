import { default as default_2 } from 'react';
import { JSX as JSX_2 } from 'react/jsx-runtime';

export declare const EntityCard: ({ title, subtitle, description, imageUrl, actions, footer, triggerType, popupMode, trigger, open, onOpenChange, modalTitle, width, placement, data, hoverOpenDelay, closeDelay, autoPlacement, hoverAutoClose, hoverAutoCloseDelay, }: EntityCardProps) => JSX_2.Element;

declare interface EntityCardAction {
    label: string;
    onClick?: () => void;
}

export declare interface EntityCardData {
    type?: string;
    id?: string;
    style?: {
        width?: string;
        height?: string;
        max_width?: string;
        max_height?: string;
        cover_max_height?: string;
    };
    color?: string;
    icon?: string;
    title?: string;
    subtitle?: string;
    url?: string;
    cover?: string;
    categories?: string[];
    tags?: string[];
    properties?: Array<{
        icon?: string;
        value?: any;
        view?: string;
        payload?: any;
    }>;
    details?: {
        table?: {
            rows?: Array<{
                columns?: Array<{
                    label?: string;
                    value?: any;
                    view?: string;
                    payload?: any;
                }>;
            }>;
        };
    };
}

export declare interface EntityCardProps {
    title: string;
    subtitle?: string;
    description?: string;
    imageUrl?: string;
    actions?: EntityCardAction[];
    footer?: string;
    triggerType?: "click" | "hover";
    popupMode?: "modal";
    trigger?: default_2.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    modalTitle?: string;
    width?: number;
    placement?: "left" | "right" | "top" | "bottom";
    hoverOpenDelay?: number;
    closeDelay?: number;
    autoPlacement?: boolean;
    hoverAutoClose?: boolean;
    hoverAutoCloseDelay?: number;
    data?: EntityCardData;
}

export declare const EntityLabel: default_2.FC<EntityLabelProps>;

declare interface EntityLabelProps {
    data?: EntityCardData;
}

export { }
