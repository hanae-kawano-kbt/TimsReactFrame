import { Box } from '@mui/material'
import { useState } from 'react'
import { Theme } from '@mui/material'
import 'powerbi-report-authoring'
// DatePickerインストール
import { ReactComponent as datepickerIcon } from '../assets/icons/datepicker_icon.svg'
import { addDays, subDays } from 'date-fns';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ja from 'date-fns/locale/ja'
//週数
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import { styled } from '@mui/material/styles';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import endOfWeek from "date-fns/endOfWeek";
import isSameDay from "date-fns/isSameDay";
import isWithinInterval from "date-fns/isWithinInterval";
import startOfWeek from "date-fns/startOfWeek";

const styles = {
  // ラベル部分スタイル
  labelStyle: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '100vh',
      height: '36px',
      borderColor: (theme: Theme) => theme.colors.white,
      backgroundColor: (theme: Theme) => theme.colors.white,
      padding: '8px 16px 5px 16px',
      '& fieldset': {
        border: 'none',  // 通常時のボーダー色(アウトライン)
      },
      '&:hover fieldset': {
        border: 'none',    // ホバー時のボーダー色(アウトライン)
      },
      '& label': {
        color: '#41424B', // 通常時のラベル色
      },
    },
    '& .MuiOutlinedInput': {
      padding: '0px'
    },
    '& input': {
      borderColor: (theme: Theme) => theme.colors.white,
      width: '100%',
      readonly: "readonly"
    },
    '& .MuiInputBase-input': {
      color: '#41424B',    // 入力文字の色
      padding: '0px',
      height: '24px',
      fontSize: '16px'
    },
    ' .MuiInputAdornment': {
      margin: '0px'
    },
    ' .MuiInputAdornment-root': {
      marginLeft: '0px'
    },

    //アイコン
    '& svg': {
      height: '16px',
      width: '16px'
    }
  },

  // カレンダー内スタイル
  calendarStyle: {
    '.MuiCalendarOrClockPicker-root': {
      '& .PrivatePickersYear-yearButton': {
        '&.Mui-selected': {
          backgroundColor: (theme: Theme) => theme.palette.primary.main,
          color: (theme: Theme) => theme.colors.white,
          fontWeight: 'bold',
        }
      },
      '& .PrivatePickersMonth-root': {
        '&.Mui-selected': {
          backgroundColor: (theme: Theme) => theme.palette.primary.main,
          color: (theme: Theme) => theme.colors.white,
          fontWeight: 'bold',
        }
      },
      '& .MuiPickersDay-root': {
        '&.Mui-selected': {
          backgroundColor: (theme: Theme) => theme.palette.primary.main,
          color: (theme: Theme) => theme.colors.white,
          fontWeight: 'bold',
        }
      }
    }
  }
}

export const WeekPickerCalendar = () => {

  // DatepickerのState定義
  const [value, setValue] = useState<Date | null>(new Date())
  // DatePicker関数定義
  const handleChange = (newValue: Date | null) => {
    setValue(newValue)
  }

  // 週モードの表示するState定義
  const getDisplayDate = (value: Date | null) => {

    //日付未選択の場合
    if (value == null) {
      return '';
    } else {
      //日付を選択している場合
      let selectedDate = value.getDay();

      //選択する週の日付取得
      if (selectedDate == 0) {
        //選択日が日曜日の場合
        const start = subDays(startOfWeek(value), 6);
        const end = subDays(endOfWeek(value), 6);

        return (formatStartDate(start) + ' ~ ' + formatEndDate(end));
      } else {
        //選択日が日曜日以外の場合
        const start = addDays(startOfWeek(value), 1);
        const end = addDays(endOfWeek(value), 1);

        return (formatStartDate(start) + ' ~ ' + formatEndDate(end));
      }
    }
  };

  //週初日：日付フォーマット変換(Date⇒String)
  const formatStartDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1);
    const day = date.getDate();

    return (year + '/' + ('0' + month).slice(-2) + '/' + ('0' + day).slice(-2));

  };

  //週最終日：日付フォーマット変換(Date⇒String)
  const formatEndDate = (date: Date) => {
    const month = (date.getMonth() + 1);
    const day = date.getDate();

    return (('0' + month).slice(-2) + '/' + ('0' + day).slice(-2));

  };

  dayjs.extend(isBetweenPlugin);
  // weekPicker インターフェース定義
  type CustomPickerDayProps = PickersDayProps<Date> & {
    dayIsBetween: boolean;
    isFirstDay: boolean;
    isLastDay: boolean;
  };

  const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) =>
      prop !== "dayIsBetween" && prop !== "isFirstDay" && prop !== "isLastDay",
  })<CustomPickerDayProps>(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
    //該当する週の場合
    ...(dayIsBetween && {
      borderRadius: 0,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      "&:hover, &:focus": {
        backgroundColor: theme.palette.primary.main,
      },
    }),
    //初日
    ...(isFirstDay && {
      borderTopLeftRadius: "50%",
      borderBottomLeftRadius: "50%",
    }),
    //最終日
    ...(isLastDay && {
      borderTopRightRadius: "50%",
      borderBottomRightRadius: "50%"
    }),
  })) as React.ComponentType<CustomPickerDayProps>;

  // weekPicker 週関数定義
  const renderWeekPickerDay = (
    date: Date,
    selectedDates: Array<Date | null>,
    pickersDayProps: PickersDayProps<Date>
  ) => {

    //見切れ修正
    const newPickersDayProps = {
      ...pickersDayProps, // デフォルトのPickersDayコンポーネントのプロパティ
      ...{
        showDaysOutsideCurrentMonth: true, // カレンダーの表示月以外の日もレンダリング
        disableMargin: true, // 日付同士の margin: 0
        disabled: pickersDayProps.outsideCurrentMonth // カレンダーの表示月以外の日は選択不可
          ? true
          : pickersDayProps.disabled
      },
    };
    if (!value) {
      return <PickersDay {...newPickersDayProps} />; // 選択されていない場合、色塗り無しでレンダリング
    }

    //選択日付
    const selectedDayOfWeek = value.getDay();

    //選択する週の日付取得
    let start; //選択日付の週の初日(月曜日)
    let end;   //選択日付の週の最終日(日曜日)
    if (selectedDayOfWeek == 0) {
      //選択日が日曜日の場合
      start = startOfWeek(value).setDate((startOfWeek(value)).getDate() - 6);
      end = endOfWeek(value).setDate(endOfWeek(value).getDate() - 6);

    } else {
      //選択日が日曜日以外の場合
      start = startOfWeek(value).setDate((startOfWeek(value)).getDate() + 1);
      end = endOfWeek(value).setDate(endOfWeek(value).getDate() + 1);
    }

    const dayIsBetween = isWithinInterval(date, { start, end });
    const isFirstDay = isSameDay(date, start);
    const isLastDay = isSameDay(date, end);

    return (
      // 選択されている場合、色塗り有りでレンダリング
      <CustomPickersDay
        {...newPickersDayProps}
        dayIsBetween={dayIsBetween}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
      />
    );
  };

  return (
    <Box display='flex'>
      {/* 週 */}
      <Box>
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={ja}
          dateFormats={{ monthAndYear: "yyyy年 MM月", year: "yyyy年" }}
          localeText={{
            previousMonth: "前月を表示",
            nextMonth: "次月を表示",
            cancelButtonLabel: "キャンセル",
            okButtonLabel: "選択",
          }}>
          <Box sx={styles.labelStyle} width='223px'>
            <DatePicker
              value={value}
              onChange={handleChange}
              inputFormat={getDisplayDate(value)}
              disableHighlightToday={true}
              PaperProps={{ sx: styles.calendarStyle }}
              components={{
                OpenPickerIcon: datepickerIcon
              }}
              closeOnSelect={false}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  inputProps={
                    { ...params.inputProps, readOnly: true }
                  }
                />
              )}
              renderDay={renderWeekPickerDay}
            />
          </Box>
        </LocalizationProvider>
      </Box>
    </Box>
  )
}