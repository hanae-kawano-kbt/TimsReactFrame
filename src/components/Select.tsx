// Select.tsx
// セレクターのAtom
import * as React from 'react'
import { FC } from 'react'
import { styled } from '@mui/material/styles'
import {
  Select as MuiSelect,
  MenuItem,
  FormControl,
  InputBase,
} from '@mui/material'

const Input = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: 25,
    backgroundColor: '#f7fafc',
    boxShadow: '0px 3px 6px #1717172d',
    padding: '3px 24px 4px 20px',
    fontSize: 14,
    '&:focus': {
      borderRadius: 25,
      backgroundColor: '#f7fafc',
    },
    height : '5px',
    maxHeight : '50px',
  },
}))

const styles = {
  combo: {
     ml: 3,
     width: 100
  },
  lists: {
    height : 50,
    maxHeight : 250,
  },
  'MuiMenu-list':{
    maxHeight : 250
  }
}

//#region 年リストの生成
function getYears(): SelectElement[] {
  var years: SelectElement[] =
    [
      { text: '今年', value: getStrYear(0) }
      , { text: getStrYear(-1) + '年', value: getStrYear(-1) }
      , { text: getStrYear(-2) + '年', value: getStrYear(-2) }
      , { text: getStrYear(-3) + '年', value: getStrYear(-3) }
      , { text: getStrYear(-4) + '年', value: getStrYear(-4) }
    ]
  return years;
}
function getStrYear( shift :number ): string {
  return (new Date().getFullYear() + shift).toString() ;
}
//#endregion 年の生成


/**
 * 直前の月曜日を取得
 */
function getLastMonday(targetDate: Date): Date {
  var weekOfDay = targetDate.getDay();
  if (weekOfDay === 0) {
    weekOfDay = 7;
  }
  var lastMonday = new Date(targetDate.setDate(targetDate.getDate() - (weekOfDay - 1)));
  // Truncの代わり
  return new Date(
    lastMonday.getFullYear(),
    lastMonday.getMonth(),
    lastMonday.getDate()
  );
}

enum DateFormat {
  YY_MM_DD = 'YYYY/MM/DD',
  MM_DD = 'MM/DD～',
}

function formatDate(inputDate: Date, format: DateFormat): string {
  var date = inputDate.getDate();
  var month = inputDate.getMonth() + 1;
  var year = inputDate.getFullYear();

  if (format == DateFormat.YY_MM_DD){
    return `${year}/${month.toString().padStart(2, '0')}/${date.toString().padStart(2, '0')}`;
  } else {
    return `${month.toString().padStart(2, '\u00A0')}/${date.toString().padStart(2, '\u00A0')} ～`;
  }
}


/**
 * 週の取得
 */
function getWeeks(  strYear : string): SelectElement[] {

  var lastMonday:Date;

  if (  strYear == '' ||  strYear  == new Date().getFullYear().toString() ) {
      // 今年,or string.EmptyはSysDate基準。
      lastMonday = getLastMonday(new Date());
  } else {
      // それ以外は年末日を基準にする。
    lastMonday = getLastMonday(new Date(+strYear, 11, 31));
  }

  var weeks: SelectElement[] = [];

  for ( var monday = new Date(lastMonday) ;
    monday > new Date(lastMonday.getFullYear(), 0, 1);
    monday = new Date(monday.setDate(monday.getDate() - 7))) {

    if (monday.getTime() == lastMonday.getTime()
        && lastMonday.getFullYear() == new Date().getFullYear() ) {

          console.log(monday.getTime());
        weeks.push({ text: '今週', value: formatDate(monday, DateFormat.YY_MM_DD) });
    } else {
      weeks.push({ text: formatDate(monday, DateFormat.MM_DD), value: formatDate(monday, DateFormat.YY_MM_DD) });
    }
  }
  return weeks;
}

type Props = {
  selectElementType: SelectElementType
}

export enum SelectElementType {
  years,
  weeks
}

export type SelectElement = {
  text: string
  , value: string
}

export const Select : FC<Props> = ({selectElementType}) => {

  var lists:SelectElement[];
  if (selectElementType === SelectElementType.years) {
    lists = getYears();
  }else {
    lists = getWeeks('2021');
  }

  const [value, setValue] = React.useState< string>(lists[0].value)
  const handleChange = (event: { target: { value: string } }) => {
    setValue(event.target.value)
  }

  // Listを突っ込んだコンボボックスを返すよ
  return (
    <FormControl sx={ styles.combo } variant="standard"  >
      <MuiSelect sx={ styles.lists}  value={value} onChange={handleChange} input={<Input />}  >
        {lists.map((choice) => (
            <MenuItem value={choice.value} >{choice.text}</MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  )
}