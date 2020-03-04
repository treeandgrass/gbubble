export type int8 = typeof Int8Array;
export type uint8 = typeof Uint8Array;
export type ucint8 = typeof Uint8ClampedArray;
export type int16 = typeof Int16Array;
export type uint16 = typeof Uint16Array;
export type int32 = typeof Int32Array;
export type uint32 = typeof Int32Array;
export type float32 = typeof Float32Array;
export type float64 = typeof Float64Array;


export type Typed = int8 | uint8 | ucint8
    | int16 | uint16 | int32 | uint32
    | float32 | float64;

export type TypedArray = Int8Array | Uint8Array | Uint8ClampedArray
    | Int16Array | Uint16Array | Int32Array | Int32Array
    | Float32Array | Float64Array;
