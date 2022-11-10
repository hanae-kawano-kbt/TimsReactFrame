import { Box } from '@mui/material'
import { useState } from 'react'
import { Theme } from '@mui/material'
import 'powerbi-report-authoring'
// DatePickerインストール
import { ReactComponent as datepickerIcon } from '../assets/icons/datepicker_icon.svg'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ja from 'date-fns/locale/ja'

const styles = {
  // ラベル部分スタイル
  labelStyle: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '100vh',
      height: '36px',
      borderColor: '#FFFFFF',
      backgroundColor: '#FFFFFF',
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
      borderColor: '#FFFFFF',
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
    '& .MuiInput-underline:before': {
      //borderBottomColor: '#FFFFFF', // 通常時のボーダー色
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      //borderBottomColor: '#FFFFFF',  // ホバー時のボーダー色
    },
    ' .MuiInputAdornment-root': {
      marginLeft: '0px'
    },

    //アイコン
    '& svg': {
      height: '16px',
      width: '16px'
    },

    //カレンダー
    '& .Mui-selected:focus': {
      backgroundColor: '#00a8a9'
    },
    '& .Mui-selected:hover': {
      backgroundColor: '#00a8a9'
    },
    '> .css-1hkbm26-.PrivatePickersYear-button.Mui-selected:focus': {
      backgroundColor: '#00a8a9'
    },
    '& .css-1hkbm26-PrivatePickersYear-button.Mui-selected:hover': {
      backgroundColor: '#00a8a9'
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

export const YearPickerCalendar = () => {

  // DatepickerのState定義
  const [value, setValue] = useState<Date | null>(new Date())
  // DatePicker関数定義
  const handleChange = (newValue: Date | null) => {
    setValue(newValue)
  }

  return (
    <Box display='flex'>
      {/* 年のみ */}
      <Box>
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={ja}
          dateFormats={{ year: "yyyy年" }}
          localeText={{
            previousMonth: "前月を表示",
            nextMonth: "次月を表示",
            cancelButtonLabel: "キャンセル",
            okButtonLabel: "選択",
          }}>
          <Box sx={styles.labelStyle} width='114px'>
            <DatePicker
              value={value}
              onChange={handleChange}
              views={['year']}
              inputFormat='yyyy年'
              mask='____'
              disableHighlightToday={true}
              PaperProps={{ sx: styles.calendarStyle }}
              components={{
                OpenPickerIcon: datepickerIcon
              }}
              closeOnSelect={false}
              renderInput={(params) => <TextField
                {...params}
                fullWidth
                inputProps={
                  { ...params.inputProps, readOnly: true }
                }
              />}
            />
          </Box>
        </LocalizationProvider>
      </Box>
    </Box>
  )
}