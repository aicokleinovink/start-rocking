import { NgModule } from '@angular/core';
import { ListItemComponent } from './list-item/list-item.component';
import { ListComponent } from './list.component';

const components = [ListComponent, ListItemComponent];

@NgModule({
  imports: [...components],
  exports: [...components],
})
export class ListModule {}
