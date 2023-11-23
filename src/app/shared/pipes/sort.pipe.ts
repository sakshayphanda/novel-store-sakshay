import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy',
  standalone: true,
})
export class SortPipe implements PipeTransform {
  transform(list: any[] | undefined, sortFunction: Function | null) {
      if (!sortFunction) return list;
      const sortedList = list?.slice();
      return sortedList?.sort((a, b) => sortFunction(a, b));
  }
}
