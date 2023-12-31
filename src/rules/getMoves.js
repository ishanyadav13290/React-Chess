import rules from "./rules";

export const getRookMoves = ({ position, piece, rank, file }) => {
  const moves = [];
  const us = piece[0];
  const enemy = us === "w" ? "b" : "w";

  const direction = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  direction.forEach((dir) => {
    for (let i = 1; i < 8; i++) {
      const x = rank + i * dir[0];
      const y = file + i * dir[1];
      if (position?.[x]?.[y] === undefined) break;
      if (position[x][y].startsWith(enemy)) {
        moves.push([x, y]);
        break;
      }
      if (position[x][y].startsWith(us)) {
        break;
      }
      moves.push([x, y]);
    }
  });

  return moves;
};

export const getKnightMoves = ({ position, rank, file }) => {
  const moves = [];
  const enemy = position[rank][file].startsWith("w") ? "b" : "w";

  const candidates = [
    [-2, -1],
    [-2, 1],
    [2, -1],
    [2, 1],
    [1, -2],
    [1, 2],
    [-1, -2],
    [-1, 2],
  ]; //possible moves of knight's moves

  candidates.forEach((c) => {
    const cell = position?.[rank + c[0]]?.[file + c[1]];
    if (cell !== undefined && (cell.startsWith(enemy) || cell === "")) {
      moves.push([rank + c[0], file + c[1]]);
    }
  });
  return moves;
};

export const getBishopMoves = ({ position, piece, rank, file }) => {
  const moves = [];
  const us = piece[0];
  const enemy = us === "w" ? "b" : "w";

  const direction = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  direction.forEach((dir) => {
    for (let i = 1; i < 8; i++) {
      const x = rank + i * dir[0];
      const y = file + i * dir[1];
      if (position?.[x]?.[y] === undefined) break;
      if (position[x][y].startsWith(enemy)) {
        moves.push([x, y]);
        break;
      }
      if (position[x][y].startsWith(us)) {
        break;
      }
      moves.push([x, y]);
    }
  });

  return moves;
};

export const getQueenMoves = ({ position, piece, rank, file }) => {
  const moves = [
    ...getBishopMoves({ position, piece, rank, file }),
    ...getRookMoves({ position, piece, rank, file }),
  ];

  return moves;
};

export const getKingMoves = ({ position, rank, file }) => {
  const moves = [];
  const enemy = position[rank][file].startsWith("w") ? "b" : "w";

  const candidates = [
    [-1, 0],
    [-1, 1],
    [1, 0],
    [1, -1],
    [1, 1],
    [0, -1],
    [0, 1],
    [-1, -1],
  ]; //possible moves of knight's moves

  candidates.forEach((c) => {
    const cell = position?.[rank + c[0]]?.[file + c[1]]; //current position[mainArray+possibleArrayLocationIndex]
    if (cell !== undefined && (cell.startsWith(enemy) || cell === "")) {
      moves.push([rank + c[0], file + c[1]]);
    }
  });
  return moves;
};
export const getPawnCapture = ({ position,prevPosition,piece, rank, file }) => {
  const moves = [];
  const  dir = piece === 'wp' ? 1:-1

  

  if(!position?.[rank+dir][file]){ //if empty spot, move forward one
    moves.push([rank+dir,file])
  }
  if(rank%5===1){ //means original position
    if(position?.[rank+dir]?.[file] ==='' && position?.[rank+dir+dir]?.[file]==='' ){ //if empty spot, move forward one
        moves.push([rank+dir+dir,file])
      }
  }

  //En-Passant move
  const enemyPawn = dir === 1 ? 'bp' : 'wp' //if going up, its black pawn else white pawn
  
  const adjacentFiles = [file-1,file+1]
  if(prevPosition){
    // white in row 5           black on row 3
    if ((dir === 1 && rank === 4) || (dir === -1 && rank === 3)){

      adjacentFiles.forEach(f => {

        //if pawn has moves from original position to 2 steps ahead
        if (position?.[rank]?.[f] === enemyPawn && 
          position?.[rank+dir+dir]?.[f] === '' &&
          prevPosition?.[rank]?.[f] === '' && 
          prevPosition?.[rank+dir+dir]?.[f] === enemyPawn){
              moves.push ([rank+dir,f])
          }
      })
    }
  }
  
  return moves;
};
export const getPawnMoves = ({ position,prevPosition,piece, rank, file }) => {
  const moves = [];
  const enemy = piece[0]==="w"?"b" : "w";
  const  dir = piece === 'wp' ? 1:-1

  if(position?.[rank+dir]?.[file-1]&&position?.[rank+dir]?.[file-1].startsWith(enemy)){ //on lef side
    moves.push([rank+dir,file-1])
  }
  if(position?.[rank+dir]?.[file+1]&&position?.[rank+dir]?.[file+1].startsWith(enemy)){// onright side
    moves.push([rank+dir,file+1])
  }
  
  return moves;
};

export const getCastlingMoves=({position,castleDirection,piece,rank,file})=>{
  const moves =[];
  if(file!==4 || rank%7!==0 || castleDirection==='none'){
    return moves
  }
  if(piece.startsWith('w')){
    if(rules.isPlayerInCheck({positionAfterMove:position,player:'w'})){
      return moves
    }
    if(['left','both'].includes(castleDirection) && 
    !position[0][3] &&
    !position[0][2] &&
    !position[0][1] &&
    position[0][0]==='wr' && 
    !rules.isPlayerInCheck({
      positionAfterMove:rules.performMove({position,piece,rank,file,x:0,y:3}),
      player:'w'
      
    }) && !rules.isPlayerInCheck({
      positionAfterMove:rules.performMove({position,piece,rank,file,x:0,y:2}),
      player:'w'
      
    }))
    {
      moves.push([0,2])
    }
    if(['right','both'].includes(castleDirection) && 
    !position[0][5] &&
    !position[0][6] &&
    position[0][7] ==='wr' && 
    !rules.isPlayerInCheck({
      positionAfterMove:rules.performMove({position,piece,rank,file,x:0,y:5}),
      player:'w'
      
    }) && !rules.isPlayerInCheck({
      positionAfterMove:rules.performMove({position,piece,rank,file,x:0,y:6}),
      player:'w'
      
    })){
      moves.push([0,6])
    }
  } else{
    if(rules.isPlayerInCheck({positionAfterMove:position,player:'b'})){
      return moves
    }
    if(['left','both'].includes(castleDirection) && 
    !position[7][3] &&
    !position[7][2] &&
    !position[7][1] &&
    position[7][0]==='br' && 
    !rules.isPlayerInCheck({
      positionAfterMove:rules.performMove({position,piece,rank,file,x:7,y:3}),
      player:'b'
      
    }) && !rules.isPlayerInCheck({
      positionAfterMove:rules.performMove({position,piece,rank,file,x:7,y:2}),
      player:'b'
      
    })){
      moves.push([7,2])
    }
    if(['right','both'].includes(castleDirection) && 
    !position[7][5] &&
    !position[7][6] &&
    position[7][7] ==='br' && 
    !rules.isPlayerInCheck({
      positionAfterMove:rules.performMove({position,piece,rank,file,x:7,y:5}),
      player:'b'
      
    }) && !rules.isPlayerInCheck({
      positionAfterMove:rules.performMove({position,piece,rank,file,x:7,y:6}),
      player:'b'
      
    })){
      moves.push([7,6])
    }
  }

  return moves
}
export const getCastleDirections=({castleDirection,piece,rank,file})=>{
  const direction = castleDirection[piece[0]] //ex: castle direction of w
  rank = Number(rank)
  file = Number(file)
  if(piece.endsWith('k')){
    return 'none'
  }
  if(file===0 && rank===0){
    if(direction=== 'both'){
      return 'right'
    }
    if(direction=== 'left'){
      return 'none'
    }
  }
  
  if(file===7 && rank===0){
    if(direction=== 'both'){
      return 'left'
    }
    if(direction=== 'right'){
      return 'none'
    }
  }
//
  if(file===0 && rank===7){
    if(direction=== 'both'){
      return 'right'
    }
    if(direction=== 'left'){
      return 'none'
    }
  }
  
  if(file===7 && rank===7){
    if(direction=== 'both'){
      return 'left'
    }
    if(direction=== 'right'){
      return 'none'
    }
  }
}
export const getKingPosition = (position, player) => {
  let kingPos 
  position.forEach((rank,x) => {
      rank.forEach((file, y) => {
          if(position[x][y].startsWith(player) && position[x][y].endsWith('k'))
              kingPos=[x,y]
      })
  })
  return kingPos
}
export const getPieces = (position, enemy) => {
  const enemyPieces = []
  position.forEach((rank,x) => {
      rank.forEach((file, y) => {
          if(position[x][y].startsWith(enemy))
              enemyPieces.push({
                  piece : position[x][y],
                  rank : x,
                  file : y,
              })
      })
  })
  return enemyPieces
}

