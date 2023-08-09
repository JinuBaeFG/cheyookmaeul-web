import React, { useEffect, useState } from "react";
import axios from "axios";
import { Editor as WysiwygEditor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ContentState, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

interface IEditor {
  htmlStr: string;
  setHtmlStr: React.Dispatch<React.SetStateAction<string>>;
}

const Editor: React.FC<IEditor> = ({ htmlStr, setHtmlStr }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  useEffect(() => {
    const blocksFromHtml = htmlToDraft(htmlStr);
    if (blocksFromHtml) {
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  }, []);

  // editor 수정 이벤트
  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
    setHtmlStr(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  const uploadCallback = (file: Blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const formData = new FormData();
        formData.append("file", file);

        const res = await axios.post("/api/uploads", formData);

        resolve({ data: { link: res.data } });
      };

      reader.readAsDataURL(file);
    });
  };

  // toolbar 설정
  const toolbar = {
    list: { inDropdown: true }, // list 드롭다운
    textAlign: { inDropdown: true }, // align 드롭다운
    link: { inDropdown: true }, // link 드롭다운
    history: { inDropdown: false }, // history 드롭다운
    image: { uploadCallback: uploadCallback }, // 이미지 커스텀 업로드
  };

  // 언어 설정
  const localization = {
    locale: "ko",
  };

  return (
    <WysiwygEditor
      editorClassName="editor" // Editor 적용 클래스
      toolbarClassName="toolbar" // Toolbar 적용 클래스
      toolbar={toolbar}
      placeholder="내용을 입력하세요."
      localization={localization}
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
    />
  );
};

export default Editor;
