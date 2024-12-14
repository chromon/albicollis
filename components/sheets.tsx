import {registerSheet, SheetDefinition} from 'react-native-actions-sheet';
import SyncSheet from './syncSheet';
 
registerSheet('example-sheet', SyncSheet);
 
// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module 'react-native-actions-sheet' {
  interface Sheets {
    'example-sheet': SheetDefinition;
  }
}
 
export {};