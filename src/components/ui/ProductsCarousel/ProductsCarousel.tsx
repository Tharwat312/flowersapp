'use client'
import React, { useState, useEffect, useCallback } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { Thumb } from './EmblaCarouselThumbsButton'
import Image from 'next/image'
import styles from './ProductsCarousel.module.css'

type PropType = {
    mainImage: string
    thumbnails: string[]
    alt: string;
    options?: EmblaOptionsType
}

const ProductsCarousel: React.FC<PropType> = (props) => {
    const { mainImage, thumbnails, alt, options } = props
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: 'keepSnaps',
        dragFree: true
    })

    const onThumbClick = useCallback(
        (index: number) => {
            if (!emblaMainApi || !emblaThumbsApi) return
            emblaMainApi.scrollTo(index)
        },
        [emblaMainApi, emblaThumbsApi]
    )

    const onSelect = useCallback(() => {
        if (!emblaMainApi || !emblaThumbsApi) return
        setSelectedIndex(emblaMainApi.selectedScrollSnap())
        emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
    }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

    useEffect(() => {
        if (!emblaMainApi) return
        onSelect()
        emblaMainApi.on('select', onSelect).on('reInit', onSelect)
    }, [emblaMainApi, onSelect])

    return (
        <div className={styles.embla}>
            <div className={styles.viewport} ref={emblaMainRef}>
                <div className={styles.container}>
                    <div className={styles.slide}>
                        <div className={styles.slideImgContainer}>
                            <Image
                                src={mainImage}
                                alt={alt}
                                width={500}
                                height={500}
                                className={styles.slideImg}
                                style={{ objectFit: 'cover' }}
                                priority
                            />
                        </div>
                    </div>
                    {thumbnails.map((imageUrl, index) => (
                        <div className={styles.slide} key={index}>
                            <div className={styles.slideImgContainer}>
                                <Image
                                    src={imageUrl}
                                    alt={alt}
                                    width={500}
                                    height={500}
                                    className={styles.slideImg}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.thumbs}>
                <div className={styles.thumbsViewport} ref={emblaThumbsRef}>
                    <div className={styles.thumbsContainer}>
                        <Thumb
                            key="main"
                            onClick={() => onThumbClick(0)}
                            selected={selectedIndex === 0}
                            index={0}
                            imageUrl={mainImage}
                        />
                        {thumbnails.map((imageUrl, index) => (
                            <Thumb
                                key={index + 1}
                                onClick={() => onThumbClick(index + 1)}
                                selected={index + 1 === selectedIndex}
                                index={index + 1}
                                imageUrl={imageUrl}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsCarousel