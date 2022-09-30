import { FC, memo, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "react-feather";

interface ImageProps {
    images: Array<string>;
}

const ImageCollageMemo: FC<ImageProps> = (props) => {
    const { images } = props;
    const [main, setMain] = useState("");
    const [indexImage, setIndexImage] = useState(1);

    useEffect(() => {
        if (images)
            setMain(images[0])
    }, [images])

    const handleImage = (image: string, index: number) => {
        setMain(image)
        setIndexImage(index + 1)
    }

    const handleNextImageCursor = (index: number) => {
        const indexImage = index - 1;
        setMain(images[indexImage + 1])
        setIndexImage(index + 1)
    }

    const handlePrevImageCursor = (index: number) => {
        const indexImage = index -1;
        setMain(images[indexImage - 1])
        setIndexImage(index - 1)
    }

    return (
        <div className="text-center">
            <div className="flex justify-center">
                <img
                    src={main}
                    alt={main}
                />
                {images &&
                    <div
                        className="flex flex-row relative gap-1"
                        style={{ top: '34vh', left: '-1vh', height: 26 }}
                    >
                        <button
                            className={indexImage === 1 ? "rounded-md bg-slate-200" : "rounded-md bg-slate-400"}
                            onClick={() => handlePrevImageCursor(indexImage)}
                            disabled={indexImage === 1}
                        >
                            <ChevronLeft color="#dcdfe3" />
                        </button>
                        <div>
                            {`${indexImage}/${images && images.length}`}
                        </div>
                        <button
                            className={indexImage === images.length ? "rounded-md bg-slate-200" : "rounded-md bg-slate-400"}
                            onClick={() => handleNextImageCursor(indexImage)}
                            disabled={indexImage === images.length}
                        >
                            <ChevronRight color="#dcdfe3" />
                        </button>
                    </div>
                }
            </div>
            <div className="flex flex-row justify-center gap-1">
                {images && images.map((image: string, index: number) => <img
                    src={image}
                    alt={image}
                    width="100"
                    onClick={() => handleImage(image, index)}
                    className={main === image ? "rounded-md cursor-pointer border border-rose-700" : "rounded-md cursor-pointer"}
                />)}
            </div>
        </div>
    )
}

export default memo(ImageCollageMemo)