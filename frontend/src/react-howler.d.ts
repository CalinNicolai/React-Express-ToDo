declare module 'react-howler' {
    import { Component } from 'react';

    interface HowlerProps {
        src: string | string[];
        playing?: boolean;
        format?: string[];
        mute?: boolean;
        loop?: boolean;
        preload?: boolean;
        volume?: number;
        onEnd?: () => void;
        onLoad?: () => void;
        onPlay?: () => void;
        onPause?: () => void;
        onStop?: () => void;
        onLoadError?: (id: number, error: any) => void;
        onPlayError?: (id: number, error: any) => void;
    }

    export default class Howler extends Component<HowlerProps> {}
}
