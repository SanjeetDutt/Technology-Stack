import style from "./page.module.scss"

export default function(){

    const shades = ["VIOLET","INDIGO","BLUE","GREEN","YELLOW","ORANGE","RED","BLACK","WHITE"];
    const codes = ["100","200","300","400","500","600","700","800","900"];

    return shades.map((shade, i) => (
        <div key={i} className={style.colorContainer}>
            <h1 className={style.colorTitle}>{shade}</h1>
            {codes.map((code, i) => (
                <div key={i} className={`${style.colorTile} bg-${shade}-${code}`}>
                    <span>{code}</span>
                </div>
            ))}
        </div>
    ))
}