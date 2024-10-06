import { feedSlice, getFeed, initialState } from "./feedSlice";

const mockRes = {
    success: true,
    orders: [
        {
            _id: '66ed6ad7119d45001b507edb',
            status: 'done',
            name: 'Флюоресцентный бургер',
            createdAt: '2024-10-20T15:28:48.259Z',
            updatedAt: '2024-10-20T15:29:48.801Z',
            number: 57432,
            ingredients: ['6643d69a5c3f7b9001cfa093d']
        },
        {
            _id: '66ed7358119d45001b507ef4',
            status: 'done',
            name: 'Краторный бургер с плодами Фалленианского дерева',
            createdAt: '2024-10-20T13:06:33.689Z',
            updatedAt: '2024-10-20T13:07:37.427Z',
            number: 58435,
            ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0947']
        }
    ],
    total: 3,
    totalToday: 3
};


describe('feedSlice', () => {
    test('getFeed.rejected', () => {
        const typeOfAction = {
            type: getFeed.rejected.type,
        }

        const testCheck = { ...initialState, loading: false, error: 'error' }
        const test = feedSlice.reducer(initialState, typeOfAction)
        expect(test).toEqual(testCheck)

    })

    test('getFeed.pending', () => {
        const typeOfAction = {
            type: getFeed.pending.type,
        }

        const testCheck = { ...initialState, loading: true, error: null}
        const test = feedSlice.reducer(initialState, typeOfAction)
        expect(test).toEqual(testCheck)
    })

    test('getFeed.fulfilled', () => {
        const typeOfAction = {
            type: getFeed.fulfilled.type,
            payload: mockRes
        }

        const testCheck = { ...initialState, loading: false, orders: mockRes.orders, error: null, feed: {total: mockRes.total, totalToday:mockRes.totalToday} }
        const test = feedSlice.reducer(initialState, typeOfAction)
        expect(test).toEqual(testCheck)
    })
})
