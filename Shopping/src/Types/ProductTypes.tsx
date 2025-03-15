export interface IProductProps {
    item: {
        _id: string;
        name?: string;
        images: [string];
        price: number;
        quantity?: number;

    },
    productProps: {
        imageBg?: string;
        percentageWidth?: number;
        onPress?: ()=>void;
    },
    pStyleProps: {
        
        // imageBgHt?: number;
        width?: number;
        height?: number;
        radius?: number;
        marginHorizontal?: number;
        marginBottom?: number;
        resizeMode?: 'contain'|'cover'|'stretch';
    },
}