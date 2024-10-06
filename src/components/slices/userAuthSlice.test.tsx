import { forgotPass, getUser, initialState, loginUser, logoutUser, resetPass, updUser, registerUser, userSlice } from "./userAuthSlice"

describe('userAuth', () => {
    const mockRes = {
        success: true,
        user: {
            email: 'example@gmail.com',
            name: 'Jack'
        }
    }

    const mockMessage = {
        message: 'success'
    }
    describe('getUser', () => {
        test('getUser.rejected', () => {
            const typeOfAction = {
                type: getUser.rejected.type,
                error: 'error'
            }
    
            const testCheck = { ...initialState, loading: false, error: 'error'}
            const test = userSlice.reducer(initialState, typeOfAction)
            expect(test).toEqual(testCheck)
    
        })
    
        test('getUser.pending', () => {
            const typeOfAction = {
                type: getUser.pending.type,
            }
    
            const testCheck = { ...initialState, loading: true, error: null}
            const test = userSlice.reducer(initialState, typeOfAction)
            expect(test).toEqual(testCheck)
        })
    
        test('getUser.fulfilled', () => {
            const typeOfAction = {
                type: getUser.fulfilled.type,
                payload: mockRes
            }
    
            const testCheck = { ...initialState, loading: false, user: mockRes.user, auth: true }
            const test = userSlice.reducer(initialState, typeOfAction)
            expect(test).toEqual(testCheck)
        })
    
    })

    describe('resetPass', () => {
        test('resetPass.rejected', () => {
            const typeOfAction = {
                type: resetPass.rejected.type,
                error: 'error'
            }
    
            const testCheck = { ...initialState, loading: false, error: 'error' }
            const test = userSlice.reducer(initialState, typeOfAction)
            expect(test).toEqual(testCheck)
    
        })
    
        test('resetPass.pending', () => {
            const typeOfAction = {
                type: resetPass.pending.type,
            }
    
            const testCheck = { ...initialState, loading: true, error: null }
            const test = userSlice.reducer(initialState, typeOfAction)
            expect(test).toEqual(testCheck)
        })
    
        test('resetPass.fulfilled', () => {
            const typeOfAction = {
                type: resetPass.fulfilled.type,
                payload: mockMessage
            }
    
            const testCheck = { ...initialState, loading: false }
            const test = userSlice.reducer(initialState, typeOfAction)
            expect(test).toEqual(testCheck)
        })
    
    })

    describe('forgotPass', () => {
        test('forgotPass.rejected', () => {
            const typeOfAction = {
                type: forgotPass.rejected.type,
                error: {
                    message: 'error'
                }
            }
    
            const testCheck = { ...initialState, loading: false, error: 'error'}
            const test = userSlice.reducer(initialState, typeOfAction)
            expect(test).toEqual(testCheck)
    
        })
    
        test('forgotPass.pending', () => {
            const typeOfAction = {
                type: forgotPass.pending.type,
            }
    
            const testCheck = { ...initialState, loading: true, error: null}
            const test = userSlice.reducer(initialState, typeOfAction)
            expect(test).toEqual(testCheck)
        })
    
        test('forgotPass.fulfilled', () => {
            const typeOfAction = {
                type: forgotPass.fulfilled.type,
                payload: mockMessage
            }
    
            const testCheck = { ...initialState, loading: false }
            const test = userSlice.reducer(initialState, typeOfAction)
            expect(test).toEqual(testCheck)
        })
    
    })

    describe('updUser', () => {
        test('updUser.rejected', () => {
            const typeOfAction = {
                type: updUser.rejected.type,
                error: 'error'
            }
    
            const testCheck = { ...initialState, loading: false, error: 'error' }
            const test = userSlice.reducer(initialState, typeOfAction)
            expect(test).toEqual(testCheck)
    
        })
    
        test('updUser.pending', () => {
            const typeOfAction = {
                type: updUser.pending.type,
            }
    
            const testCheck = { ...initialState, loading: true, error: null }
            const test = userSlice.reducer(initialState, typeOfAction)
            expect(test).toEqual(testCheck)
        })
    
        test('updUser.fulfilled', () => {
            const typeOfAction = {
                type: updUser.fulfilled.type,
                payload: mockRes
            }
    
            const testCheck = { ...initialState, loading: false, user: mockRes.user }
            const test = userSlice.reducer(initialState, typeOfAction)
            expect(test).toEqual(testCheck)
        })
    
    })

    describe('loginUser', () => {
        test('loginUser.rejected', () => {
            const typeOfAction = {
                type: loginUser.rejected.type,
                error: 'error'
            }
    
            const testCheck = { ...initialState, loading: false, error: 'error' }
            const test = userSlice.reducer(initialState, typeOfAction)
            expect(test).toEqual(testCheck)
    
        })
    
        test('loginUser.pending', () => {
            const typeOfAction = {
                type: loginUser.pending.type,
            }
    
            const testCheck = { ...initialState, loading: true, error: null}
            const test = userSlice.reducer(initialState, typeOfAction)
            expect(test).toEqual(testCheck)
        })
    
        test('loginUser.fulfilled', () => {
            const typeOfAction = {
                type: loginUser.fulfilled.type,
                payload: mockRes
            }
    
            const testCheck = { ...initialState, loading: false, user: mockRes.user, auth: true}
            const test = userSlice.reducer(initialState, typeOfAction)
            expect(test).toEqual(testCheck)
        })
    
    })

    describe('logoutUser', () => {
        test('logoutUser.rejected', () => {
            const typeOfAction = {
                type: logoutUser.rejected.type,
                error: 'error'
            }
    
            const testCheck = { ...initialState, loading: false, error: 'error', auth: true }
            const test = userSlice.reducer(initialState, typeOfAction)
            expect(test).toEqual(testCheck)
    
        })
    
        test('logoutUser.pending', () => {
            const typeOfAction = {
                type: logoutUser.pending.type,
            }
    
            const testCheck = { ...initialState, loading: true, error: null }
            const test = userSlice.reducer(initialState, typeOfAction)
            expect(test).toEqual(testCheck)
        })
    
        test('logoutUser.fulfilled', () => {
            const typeOfAction = {
                type: logoutUser.fulfilled.type,
            }
    
            const testCheck = initialState
            const test = userSlice.reducer(initialState, typeOfAction)
            expect(test).toEqual(testCheck)
        })
    
    })
    describe('regUser', () => {
        test('regUser.rejected', () => {
            const typeOfAction = {
                type: registerUser.rejected.type,
                error: {
                    message: 'error'
                }
            }
    
            const testCheck = { ...initialState, loading: false, error: 'error'}
            const test = userSlice.reducer(initialState, typeOfAction)
            expect(test).toEqual(testCheck)
    
        })
    
        test('regUser.pending', () => {
            const typeOfAction = {
                type: registerUser.pending.type,
            }
    
            const testCheck = { ...initialState, loading: true, error: null }
            const test = userSlice.reducer(initialState, typeOfAction)
            expect(test).toEqual(testCheck)
        })
    
        test('regUser.fulfilled', () => {
            const typeOfAction = {
                type: registerUser.fulfilled.type,
                payload: mockRes
            }
    
            const testCheck = {...initialState, user: mockRes.user}
            const test = userSlice.reducer(initialState, typeOfAction)
            expect(test).toEqual(testCheck)
        })
    
    })

})
