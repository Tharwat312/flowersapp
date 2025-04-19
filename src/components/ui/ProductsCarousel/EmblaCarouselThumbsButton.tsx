// EmblaCarouselThumbsButton.tsx
import Image from 'next/image'
import styles from './ProductsCarousel.module.css'

type ThumbProps = {
    selected: boolean
    index: number
    onClick: () => void
    imageUrl: string // Add this prop
}

export const Thumb = (props: ThumbProps) => {
    const { selected, index, onClick, imageUrl } = props

    return (
        <div
            className={`${styles.thumbsSlide} ${selected ? styles.selected : ''}`}
        >
            <button
                onClick={onClick}
                className={styles.thumbButton}
                type="button"
            >
                <Image
                    src={imageUrl}
                    alt={`Thumbnail ${index + 1}`}
                    width={100}
                    height={100}
                    style={{ objectFit: 'cover' }}
                />
            </button>
        </div>
    )
}