import { FC, memo } from "react"

interface TextfieldProps {
    label: string;
    type: string;
    name?: string;
    id?: string;
    value?: string | number;
    onChange: (e: string) => void;
}

const TextfieldMemo: FC<TextfieldProps> = (props) => {
    const { label, type, name, id, value, onChange } = props;

    return (
        <div className="text-left">
            <p>{label}</p>
            <input
                className="px-2 py-2 border border-gray-400 rounded-md w-full"
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}

export default memo(TextfieldMemo);