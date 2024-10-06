import { burgerConstructorSlice, initialState, postOrder, getOrder} from "./burgerConstructorSlice"

describe('burgerConstructor', () => {

    const newMockRes = {
        success: true,
        order: 
            {
                _id: '66ed6ad7119d45001b507edb',
                status: 'done',
                name: 'Флюоресцентный бургер',
                createdAt: '2024-10-20T15:28:48.259Z',
                updatedAt: '2024-10-20T15:29:48.801Z',
                number: 57432,
                ingredients: ['6643d69a5c3f7b9001cfa093d']
            },
        name: 'Кустoff'
    }
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
        ]
    };


    describe('postOrder', () => {
        test('postOrder.rejected', () => {
            const typeOfAction = {
                type: postOrder.rejected.type,
                error: {
                    message: 'error'
                }
            }

            const testCheck = { ...initialState, loading: false, error:  'error', orderModelData: null, orderRequest: false}
            const test = burgerConstructorSlice.reducer(initialState, typeOfAction)
            expect(test).toEqual(testCheck)


        })

        test('postOrder.pending', () => {
            const typeOfAction = {
                type: postOrder.pending.type,
            }

            const testCheck = { ...initialState, loading: true, orderRequest: true, error: null, orderModelData: null}
            const test = burgerConstructorSlice.reducer(initialState, typeOfAction)
            expect(test).toEqual(testCheck)


        })

        test('postOrder.fulfilled', () => {
            const typeOfAction = {
                type: postOrder.fulfilled.type,
                payload: newMockRes
            }

            const testCheck = { ...initialState, loading: false, orderModelData: newMockRes.order, error: null, orderRequest: false }
            const test = burgerConstructorSlice.reducer(initialState, typeOfAction)
            expect(test).toEqual(testCheck)


        })
    })

    describe('getOrder', () => {
        test('getOrder.rejected', () => {
            const typeOfAction = {
                type: getOrder.rejected.type,
                error: {
                    message: 'error'
                }
            }

            const testCheck = { ...initialState, loading: false, error: 'error', orderModelData: null, orderRequest: false }
            const test = burgerConstructorSlice.reducer(initialState, typeOfAction)
            expect(test).toEqual(testCheck)

        })

        test('getOrder.pending', () => {
            const typeOfAction = {
                type: getOrder.pending.type,
            }

            const testCheck = { ...initialState, loading: true, error: null, orderModelData: null, orderRequest: true }
            const test = burgerConstructorSlice.reducer(initialState, typeOfAction)
            expect(test).toEqual(testCheck)
        })

        test('getOrder.fulfilled', () => {
            const typeOfAction = {
                type: getOrder.fulfilled.type,
                payload: mockRes
            }

            const testCheck = { ...initialState, loading: false, orderModelData: mockRes.orders[0], error: null }
            const test = burgerConstructorSlice.reducer(initialState, typeOfAction)
            expect(test).toEqual(testCheck)
        })
    })


})

