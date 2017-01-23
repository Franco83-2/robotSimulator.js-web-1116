'use strict';
const directions = ["north", "east", "south", "west"]


class Robot {
  constructor(x, y, bearing, coordinates) {
    this.x = x
    this.y = y
    this.bearing = bearing
    this.currentDirection = 0
    this.coordinates = coordinates
  }
    orient(bearing) {
      for(let i = 0; i < directions.length; i++) {
        if(bearing === directions[i]) {
          this.bearing = bearing
          this.currentDirection = i
          return
        }
      }
      throw new Error(["Invalid Robot Bearing"])
    }

    place(options) {
      this.currentDirection = directions.indexOf(options.direction)
      this.x = options.x
      this.y = options.y
      this.bearing = options.direction
    }

    turnRight() {
      if(this.currentDirection === 3) {
        this.currentDirection = 0
        this.bearing = directions[this.currentDirection]
      } else {
        this.currentDirection += 1
        this.bearing = directions[this.currentDirection]
      }
      this.at(this.x,this.y)
    }

    turnLeft() {
      if(this.currentDirection === 0) {
        this.currentDirection = 3
        this.bearing = directions[this.currentDirection]
      } else {
        this.currentDirection -= 1
        this.bearing = directions[this.currentDirection]
      }
      this.at(this.x,this.y)
    }

    advance() {
      if(this.currentDirection === 0) {
        this.y += 1
      } else if(this.currentDirection === 1) {
        this.x += 1
      } else if(this.currentDirection === 2) {
        this.y -= 1
      } else if(this.currentDirection === 3) {
        this.x -= 1
      }
      this.at(this.x,this.y)
    }

    at(x,y) {
      this.x = x
      this.y = y
      this.coordinates = [this.x, this.y]
   }

   instructions(string) {
     let moves = string.split('')
     let movelist = []
     moves.forEach(function(element) {
       if(element == "L") {
         movelist.push("turnLeft")
        } else if(element == "R") {
          movelist.push("turnRight")
       } else if(element == "A") {
          movelist.push("advance")
       }
     })
     return movelist
   }

    evaluate(string) {
      let _this = this
      let instructions = string.split('')
      instructions.forEach(function(element) {
        if(element == "L") {
          _this.turnLeft()
        } else if(element == "R") {
          _this.turnRight()
        } else if(element == "A") {
          _this.advance()
        }
      })
    }
  }
