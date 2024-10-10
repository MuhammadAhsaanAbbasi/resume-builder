import React from 'react'
import { Button } from '../ui/button'
import { Grid } from 'lucide-react'

const ThemeButton = () => {
    return (
        <Button className='flex items-center gap-2'>
            <Grid />
            <span>
                Theme
            </span>
        </Button>
    )
}

export default ThemeButton