export type ComponentType = React.ComponentType<{
    children: React.ReactNode;
    className?: string;
    [key: string]: any;
}>

export interface DataPoint {
    x: number
    density?: number
}
