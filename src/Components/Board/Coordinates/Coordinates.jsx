import { getCharacter } from "../../../Features/Features";

export function Files({files}){
    const style={
    color : "var(--dark-tile)",
    height: "calc(.25*var(--tile-size))",
    gridColumn: "2",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    }
    return <div style={style}>
        {files.map((file,i)=><span key={file}>{getCharacter(i)}</span>)}
    </div>
}
export function Ranks({ranks}){
    const style={
    color : "var(--light-tile)",
    display: "flex",
    flexDirection:"column",
    justifyContent: "space-around",
    alignItems: "center",
    }
    return <div style={style}>
        {ranks.map(rank=><span key={rank}>{rank}</span>)}
    </div>
}