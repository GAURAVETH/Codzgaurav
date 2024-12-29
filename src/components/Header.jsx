import React from 'react'

const Header = ({title, eyebrow, description}) => {
    return (
        <>
            <div className="flex justify-center">
                <p className="text-3xl uppercase font-semibold tracking-wider bg-gradient-to-r from-emerald-300 to-sky-400 text-transparent bg-clip-text">
                   {eyebrow}
                </p>
            </div>
            <h2 className="font-serif text-white text-3xl text-center mt-6">{title}</h2>
            <p className="text-center text-white/60 mt-4">
               {description}
            </p>
        </>
    )
}

export default Header
