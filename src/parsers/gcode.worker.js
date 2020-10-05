/**
 * @fileoverview GCODE Parser Worker
 */

//Imports
import {expose} from 'threads';

//Calculate the delta between 2 vertices
function delta(relative, vertex1, vertex2)
{
  return relative ? vertex2 : vertex2 - vertex1;
}

//Calculate the absolute value between 2 vertices
function absolute(relative, vertex1, vertex2)
{
  return relative ? vertex1 + vertex2 : vertex2;
}

//Parse the file
const parse = async file =>
{
  //Extract arguments
  let gcode = new TextDecoder().decode(file);

  //Variables
  const primaryVertices = [];
  const secondaryVertices = [];
  let state = {x: 0, y: 0, z: 0, e: 0, f: 0};
  let relative = false;

  //Remove comments
  gcode = gcode.replace(/;.+/g, '').split('\n');

  //Parse commands
  for (let i = 0; i < gcode.length; i++)
  {
    //Parse tokens
    let tokens = gcode[i].split(' ');
    const command = tokens[0].toUpperCase();
    const args = {};
    tokens = tokens.splice(1);

    //Parse arguments
    for (let i = 0; i < tokens.length; i++)
    {
      //If not null, store argument
      if (tokens[i][0] != null)
      {
        const key = tokens[i][0].toLowerCase();
        const value = parseFloat(tokens[i].substring(1));
        args[key] = value;
      }
    }

    //Convert GCODE to Three.JS land

    //Linear move
    if (command == 'G0' || command == 'G1')
    {
      const line = {
        x: args.x != null ? absolute(relative, state.x, args.x) : state.x,
        y: args.y != null ? absolute(relative, state.y, args.y) : state.y,
        z: args.z != null ? absolute(relative, state.z, args.z) : state.z,
        e: args.e != null ? absolute(relative, state.e, args.e) : state.e,
        f: args.f != null ? absolute(relative, state.f, args.f) : state.f
      };

      //Only push valid coordinates/states
      if (!isNaN(line.x) &&
        !isNaN(line.y) &&
        !isNaN(line.z) &&
        !isNaN(line.e) &&
        !isNaN(line.f)
      )
      {
        //Primary (E-dimension changed)
        if (delta(relative, state.e, line.e) > 0)
        {
          primaryVertices.push(line.x, line.y, line.z);
        }
        //Secondary
        else
        {
          secondaryVertices.push(line.x, line.y, line.z);
        }
      }

      //Update position
      state = line;
    }
    //Absolute positioning
    else if (command == 'G90')
    {
      relative = false;
    }
    //Relative positioning
    else if (command == 'G91')
    {
      relative = true;
    }
    //Set position
    else if (command == 'G92')
    {
      state = args;
    }
  }

  return {primaryVertices, secondaryVertices};
};

//Expose
expose(parse);