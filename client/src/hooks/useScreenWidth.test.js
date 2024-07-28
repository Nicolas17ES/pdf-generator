import { renderHook, act } from '@testing-library/react';import useScreenWidth from './useScreenWidth';

describe('useScreenWidth hook', () => {
    // Set up a mock for window.innerWidth
    beforeAll(() => {
        global.innerWidth = 800;
    });

    // Clean up after each test
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should return initial screen width', () => {
        const { result } = renderHook(() => useScreenWidth());
        expect(result.current).toBe(800);
    });

    test('should update screen width on resize', () => {
        const { result } = renderHook(() => useScreenWidth());

        // Simulate resizing
        act(() => {
            global.innerWidth = 1200;
            window.dispatchEvent(new Event('resize'));
        });

        // Ensure the hook updates with the new width
        expect(result.current).toBe(1200);
    });

    test('should clean up event listeners on unmount', () => {
        const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

        const { unmount } = renderHook(() => useScreenWidth());
        unmount();

        // Ensure that the cleanup function removes the event listener
        expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    });
});
