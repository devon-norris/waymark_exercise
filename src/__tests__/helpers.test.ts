import { StateCovidData } from '../types'
import { reorderList, formatStateCovidData, calculateNewCaseRollingAverage, composeChartData } from '../helpers'

const mockCovidData1 = { date: '2020-04-01', cases: { total: 200 } } as StateCovidData
const mockCovidData2 = { date: '2020-04-02', cases: { total: 300 } } as StateCovidData
const mockCovidData3 = { date: '2020-04-03', cases: { total: 450 } } as StateCovidData

describe('helpers', () => {
  describe('reorderList', () => {
    it('should reorder item in list to expected location', () => {
      expect(reorderList({ list: ['one', 'two', 'three', 'four'], startIndex: 2, endIndex: 1 })).toEqual([
        'one',
        'three',
        'two',
        'four',
      ])
    })

    it('should keep the same order if start and end indexes are the same', () => {
      expect(reorderList({ list: ['one', 'two', 'three', 'four'], startIndex: 2, endIndex: 2 })).toEqual([
        'one',
        'two',
        'three',
        'four',
      ])
    })
  })

  describe('formatStateCovidData', () => {
    it('should add a timestamp and sort the data by date', () => {
      expect(formatStateCovidData([mockCovidData2, mockCovidData1, mockCovidData3])).toEqual([
        { ...mockCovidData1, timestamp: new Date(mockCovidData1.date).getTime() },
        { ...mockCovidData2, timestamp: new Date(mockCovidData2.date).getTime() },
        { ...mockCovidData3, timestamp: new Date(mockCovidData3.date).getTime() },
      ])
    })
  })

  describe('calculateNewCaseRollingAverage', () => {
    it('should return 0 if data is null', () => {
      expect(calculateNewCaseRollingAverage({ data: null, index: 0 })).toEqual(0)
    })

    it('should calculate the rolling average for fewer than 7 days', () => {
      expect(
        calculateNewCaseRollingAverage({
          data: [
            { cases: { total: 200 } } as StateCovidData,
            { cases: { total: 316 } } as StateCovidData,
            { cases: { total: 400 } } as StateCovidData,
          ],
          index: 2,
        })
      ).toEqual(67)
    })

    it('should calculate the roling average for 7 days max', () => {
      expect(
        calculateNewCaseRollingAverage({
          data: [
            { cases: { total: 200 } } as StateCovidData,
            { cases: { total: 316 } } as StateCovidData,
            { cases: { total: 400 } } as StateCovidData,
            { cases: { total: 540 } } as StateCovidData,
            { cases: { total: 720 } } as StateCovidData,
            { cases: { total: 800 } } as StateCovidData,
            { cases: { total: 850 } } as StateCovidData,
            { cases: { total: 927 } } as StateCovidData,
            { cases: { total: 1028 } } as StateCovidData,
          ],
          index: 8,
        })
      ).toEqual(90)
    })
  })

  describe('composeChartData', () => {
    it('should return chart data with x and y axis AND a chart data map with the key as the timestamp', () => {
      const mockCovidData1Timestamp = new Date(mockCovidData1.date).getTime()
      const mockCovidData2Timestamp = new Date(mockCovidData2.date).getTime()
      const mockCovidData3Timestamp = new Date(mockCovidData3.date).getTime()

      expect(
        composeChartData({
          data: formatStateCovidData([mockCovidData1, mockCovidData2, mockCovidData3]),
          metric: 'cases',
        })
      ).toEqual({
        chartData: [
          { x: mockCovidData1Timestamp, y: mockCovidData1.cases.total },
          { x: mockCovidData2Timestamp, y: mockCovidData2.cases.total },
          { x: mockCovidData3Timestamp, y: mockCovidData3.cases.total },
        ],
        chartDataMap: {
          [mockCovidData1Timestamp]: {
            ...mockCovidData1,
            timestamp: mockCovidData1Timestamp,
            rollingAverage: 0,
          },
          [mockCovidData2Timestamp]: {
            ...mockCovidData2,
            timestamp: mockCovidData2Timestamp,
            rollingAverage: 50,
          },
          [mockCovidData3Timestamp]: {
            ...mockCovidData3,
            timestamp: mockCovidData3Timestamp,
            rollingAverage: 83,
          },
        },
      })
    })
  })
})
