import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'texttransform'})
export class TextTransformPipe implements PipeTransform {
  transform(value: string): string {
    const splitBy = ','
    const splittedText = value.split( splitBy );
    let text = '';
    splittedText.forEach(e=> {
        text+=e +"<br>";
    })

    //return `${ splittedText[0] } ${ splitBy } <br> ${ splittedText[1] }`;
    return text;
  }
}