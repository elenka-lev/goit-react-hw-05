import s from './Loader.module.css';
const LoaderBtn = ({ onClick }) => {
    return (
        <>
            <button type='submit' onClick={onClick} className={s.btn}>Load more</button>
        </>
    )
}

export default LoaderBtn;