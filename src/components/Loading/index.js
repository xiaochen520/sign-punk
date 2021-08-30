import sty from './index.module.scss';

export default function Index(props) {
    let { size = 'normal' } = props;
    const baseSize = size == 'normal' ? 16 : 12;
    return (
        <div {...props} style={{width: baseSize, height: baseSize }} className={sty.loader}></div>
    )
}