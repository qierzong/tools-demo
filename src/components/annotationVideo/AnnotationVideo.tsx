import React from "react";
import Annotation from "../annotation/Annotation";
import './AnnotationVideo.scss';
import { Button } from "antd";
import { Rect } from "../shapes/rect";

const getFormatVideoTime = (time: number) => {
    let curtime = time
    let h = parseInt((curtime / 3600).toString())
    let m = parseInt(((curtime % 3600) / 60).toString())
    let s = parseInt((curtime % 60).toString())
    const hStr = h < 10 ? '0' + h : '' + h
    const mhStr = m < 10 ? '0' + m : '' + m
    const shStr = s < 10 ? '0' + s : '' + s
    return hStr + ':' + mhStr + ':' + shStr
}

interface AnnotationVideoProps {
    onChange: (val: { time: string, shape: Rect[] }) => void;
    onTimeUpdate: (val: string) => void
}

export class AnnotationVideo extends React.Component<AnnotationVideoProps> {
    videoRef: React.RefObject<HTMLVideoElement> = React.createRef();
    videoRefSrc = 'https://s3fuse-qa.s3.cn-northwest-1.amazonaws.com.cn/uploads/video/cn-appen-careers.mp4'
    ctx: CanvasRenderingContext2D | null = null;
    ratio = window.devicePixelRatio
    containerSize = {
        width: 0,
        height: 0,
        left: 0,
        top: 0
    };
    state = {
        isPause: true,
        loaded: false,
        currentTime: '00:00:00',
        duration: '00:00:00',
    }
    onChange: (val: { time: string, shape: Rect[] }) => void;
    onTimeUpdate: (val: string) => void

    constructor(props: AnnotationVideoProps) {
        super(props);
        this.onChange = props.onChange
        this.onTimeUpdate = props.onTimeUpdate

    }
    async componentDidMount() {
    }

    updateShapes = (shapes: Rect[]) => {
        console.log('shapes', shapes)
        this.onChange({ time: this.state.currentTime, shape: shapes })
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                <div className="video-wrapper">
                    <video
                        ref={this.videoRef}
                        // controls
                        src={this.videoRefSrc}
                        controlsList="nodownload noremoteplayback"
                        crossOrigin="anonymous"
                        onPause={() => { this.setState({ isPause: true }) }}
                        onPlay={() => { this.setState({ isPause: false }) }}
                        onLoadedData={() => {
                            this.setState({ duration: getFormatVideoTime(this.videoRef.current?.duration || 0) })
                            this.setState({ loaded: true })
                        }}
                        onTimeUpdate={(e) => {
                            const currentTime = this.videoRef.current?.currentTime || 0
                            const formatedCurrentTime = getFormatVideoTime(currentTime)
                            this.setState({ currentTime: formatedCurrentTime })
                            this.onTimeUpdate(formatedCurrentTime)
                        }}
                    />
                    {this.state.loaded && (
                        <Annotation
                            containerName='video-wrapper'
                            onChange={(shapes) => { this.updateShapes(shapes) }}
                        />)}
                </div>
                <div className="info-wrapper">

                    <div className="buttons">
                        {this.state.isPause ? (<Button type="primary" onClick={() => { this.videoRef.current?.play() }}>Play</Button>) : (<Button type="primary" onClick={() => { this.videoRef.current?.pause() }}>Pause</Button>)}
                    </div>
                    <div className="times">
                        {this.state.currentTime}/{this.state.duration}
                    </div>
                </div>
            </div>
        )
    }
}
export default AnnotationVideo;