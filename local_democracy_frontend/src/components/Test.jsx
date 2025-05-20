import {
    Button,
    FileUpload,
    Float,
    useFileUploadContext,
} from "@chakra-ui/react"
import { LuFileImage, LuX } from "react-icons/lu"

function Test() {
    return (
        <div>
            <FileUpload.Root accept="image/*">
                <FileUpload.HiddenInput />
                <FileUpload.Trigger asChild>
                    <Button variant="outline" size="sm">
                        <LuFileImage /> Upload Images
                    </Button>
                </FileUpload.Trigger>
                <FileUploadList />
            </FileUpload.Root>
        </div>
    )
}

const FileUploadList = () => {
    const fileUpload = useFileUploadContext()
    const files = fileUpload.acceptedFiles
    if (files.length === 0) return null
    return (
        <FileUpload.ItemGroup>
            {files.map((file) => (
                <FileUpload.Item
                    w="auto"
                    boxSize="20"
                    p="2"
                    file={file}
                    key={file.name}
                >
                    <FileUpload.ItemPreviewImage />
                    <Float placement="top-end">
                        <FileUpload.ItemDeleteTrigger boxSize="4" layerStyle="fill.solid">
                            <LuX />
                        </FileUpload.ItemDeleteTrigger>
                    </Float>
                </FileUpload.Item>
            ))}
        </FileUpload.ItemGroup>
    )
}

export default Test;