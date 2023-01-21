import React, { useEffect, useState } from "react"
import useDebounce from "../../hooks/useDebounce"

interface SuggestionItem<T> {
    suggestion: T
    index: number
    isSelected: boolean
}

interface LiveSearchProps<T> {
    onSearchExact: (searchValue: T) => void
    onSearchLike?: (query: string) => void
    fetchSuggestions: (query: string) => Promise<T[]>
    extractQuery: (value: T) => string
    renderSuggestion: (item: SuggestionItem<T>) => JSX.Element
    containerClassNames?: string
}

// Allowes to move within the suggestion`s list with [up] and [down] arrows in a circular way
const circularArrayTraversy = (array: unknown[], currentIndex: number, direction: -1 | 1): number => {
    if (array.length === 0) return -1
    const arrayIndexes = array.length - 1

    if (direction === 1) {
        currentIndex += 1
        if (arrayIndexes > currentIndex) return currentIndex
        if (arrayIndexes < currentIndex) return 0
    }

    if (direction === -1) {
        currentIndex -= 1
        if (currentIndex <= -1) return arrayIndexes
        if (arrayIndexes < currentIndex) return currentIndex
    }

    return currentIndex
}

function LiveSearch<T>({
    onSearchExact,
    onSearchLike,
    fetchSuggestions,
    extractQuery,
    renderSuggestion,
    containerClassNames
}: LiveSearchProps<T>) {

    const [query, setQuery] = useState<string>('')
    const debouncedQuery = useDebounce(query)
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const [suggestions, setSuggestions] = useState<T[]>([])
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false)

    // Fetch and set suggestions on `query` change with debounce
    useEffect(() => {
        void (async () => {
            const fetchedSuggestions = await fetchSuggestions(debouncedQuery)
            setSuggestions(fetchedSuggestions)
            setShowSuggestions(true)
        })()
    }, [fetchSuggestions, debouncedQuery])

    // Reset selected index on `query` change
    // useEffect(() => {
    //     setSelectedIndex(-1)
    // }, [query])

    // Set query by getting value from `suggestions[selectedIndex]`
    const handleSetQueryFromSuggestions = () => {
        const selectedSuggestion = suggestions[selectedIndex]
        if (!selectedSuggestion) return
        setQuery(extractQuery(selectedSuggestion))
        setSelectedIndex(-1)
    }

    // Set `query` on change from the input
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    // Handle specific keys, when clicked with the focused input
    const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { key } = e

        switch (key) {
            case 'Enter':
                e.preventDefault()
                handleSetQueryFromSuggestions()
                suggestions[selectedIndex] ? onSearchExact(suggestions[selectedIndex] as T) : onSearchLike && onSearchLike(query)
                setShowSuggestions(false)
                break
            case 'ArrowDown':
                e.preventDefault()
                !showSuggestions && setShowSuggestions(true)
                setSelectedIndex(prev => circularArrayTraversy(suggestions, prev, 1))
                break
            case 'ArrowUp':
                e.preventDefault()
                !showSuggestions && setShowSuggestions(true)
                setSelectedIndex(prev => circularArrayTraversy(suggestions, prev, -1))
                break
            case 'Escape':
                e.preventDefault()
                setShowSuggestions(false)
                break
        }
    }

    // Hide suggestions, when the input loses focus
    const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        e.preventDefault()
        setShowSuggestions(false)
    }

    // Set `selectedIndex` and set `query` from `suggestions[selectedIndex]`, by clicking on an item from suggesion`s list 
    const handleOnClickSelect = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
        e.preventDefault()
        setSelectedIndex(index)
        handleSetQueryFromSuggestions()
    }

    // Show suggestions, when the input is focused
    const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.preventDefault()
        setShowSuggestions(true)
    }

    return (
        <div className="form-control flex flex-col">
            <div className="input-group relative">
                <input
                    type="text"
                    placeholder="Search tags…"
                    className="input input-bordered w-full"
                    onFocus={handleOnFocus}
                    onKeyDown={handleOnKeyDown}
                    onBlur={handleOnBlur}
                    onChange={handleOnChange}
                    value={query}
                    tabIndex={1}
                />
                <button className="btn btn-square">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>

            </div>

            {showSuggestions ?
                <div className={containerClassNames ?? 'flex flex-col space-y-1 h-fit absolute top-full bg-base-100 my-3 p-1'}>
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            onClick={(e) => handleOnClickSelect(e, index)}
                            tabIndex={-1}
                        >
                            {renderSuggestion({
                                suggestion,
                                index,
                                isSelected: index === selectedIndex
                            })}
                        </div>
                    ))}
                </div>
                : null}
        </div>
    )
}

export default LiveSearch