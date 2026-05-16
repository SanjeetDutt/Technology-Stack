import style from "./layout.module.scss"
export default function (props:LayoutProps<"/admin">){

    return(
        <div className={style.layout} style={{backgroundImage: 'url("/img/BgBlue.svg")'}}>
            <div className={style.content}>{props.children}</div>
        </div>
    )
}