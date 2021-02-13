import Button from './Button'

const Header = ({title,onAdd,showMeme}) => {
    return (
        <div>
            <header className='headerTop'>
                <h1 style={{fontSize: 40 }}>{title}</h1>
                <Button 
                    color={showMeme ? 'red':'#4db8ff'}
                    text={showMeme? 'Close':'Create Meme'}
                    onClick={onAdd}
                />
            </header>
        </div>
    )
}

export default Header
