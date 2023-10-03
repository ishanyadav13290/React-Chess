export const createPosition = () => {

    // array of 8*8 for grid system
    const position = new Array(8).fill("").map(x=>new Array(8).fill(''))
    position[0][0] = 'whiteRook'
    position[0][1] = 'whiteHorse'
    position[0][2] = 'whiteBishop'
    position[0][3] = 'whiteQueen'
    position[0][4] = 'whiteKing'
    position[0][5] = 'whiteBishop'
    position[0][6] = 'whiteHorse'
    position[0][7] = 'whiteRook'

    position[7][0] = 'blackRook'
    position[7][1] = 'blackHorse'
    position[7][2] = 'blackBishop'
    position[7][3] = 'blackQueen'
    position[7][4] = 'blackKing'
    position[7][5] = 'blackBishop'
    position[7][6] = 'blackHorse'
    position[7][7] = 'blackRook'
    for (let i = 0; i < 8; i++) {
        position[1][i] = "whitePawn";
        position[6][i] = "blackPawn"
    }

    

    return position
}

export const copyPosititon = position =>{
    const newPosition = new Array(8).fill('').map(x=> new Array(8).fill(''))

    for(let rank =0; rank<8;rank++){
        for(let file=0;file<8;file++){
            newPosition[rank][file] = position[rank][file]
        }
    }
    return newPosition
}