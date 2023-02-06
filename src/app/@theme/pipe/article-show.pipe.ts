import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'articleShow'
})
export class ArticleShowPipe implements PipeTransform {

  transform(value: string, length: number = 400): string {
    value = value.replace(/```[^`]+```/g, '');
    value = value.replace(/#+/g, '');
    value = value.replace(/\*\*/g, '')
    return value.substring(0, length);
  }

}
