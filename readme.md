# Level generator for cody kids app
Free coding puzzles for kids

## How to run it locally

### Installation
Clone the repository & install packages

```
git clone https://github.com/cody-kids/level-generator.git
cd level-generator
npm i
```


### Run the project 
```
npm run dev
```

## Json schema
Json schema for the game

### Actions schema
```
{
    id: id of the action,
    name: name of the action,
    type: type of the action,
    direction: direction of the action,
    changeValue: the change in value after the action is invoked,
}
```

### Game schema
```
{
    id: id of the game,
    name: name of the game,
    asset_path: path to the assets used in the game
}
```

### Level schema
```
{
    id: id of the level
    name: name of the level,
    game_id: id of the game,
    level_number: level number in the game,
    grid: {
        cols: number of columns,
        rows: number of rows
    },
    path: [ 
        {
            x: x poistion of the vaild path block,
            y: y position of the valid path block
        },
        ...
    ],
    player: {
        x: x coord of the player,
        y: y coord of the player
    },
    actions: [
        1 (id of the action)
         ...
    ]
    end: {
        x: x coord of the player,
        y: y coord of the player
    }
}
```