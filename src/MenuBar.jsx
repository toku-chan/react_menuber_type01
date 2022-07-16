import {
  useState,
  useEffect,
  useRef,
  createRef
} from "react";

import * as S from "./style";

const items = [
  {name: 'アイテム1', isSelected: true},
  {name: 'アイテム123', isSelected: false},
  {name: 'アイテム12345', isSelected: false},
  {name: 'ア', isSelected: false},
];

export const MenuBar = () => {
  const [data, setData] = useState(items);
  const targetRefs = useRef([createRef()]);

  /**
   * 選択されているNavに対してStyle情報を設定
   */
  const [selectedLeft, setSelectedLeft] = useState();
  const [selectedWidth, setSelectedWidth] = useState();
  /**
   * 選択されているNavのStyleを設定
   * @param { HTMLElement } target
   */
  const setSelectedStyle = (target) => {
      setSelectedLeft(target.getBoundingClientRect().left);
      setSelectedWidth(target.getBoundingClientRect().width);
  }

  /**
   * HoverしているNavに対してStyle情報を設定
   */
  const [targetLeftPos, setTargetLeftPos] = useState();
  const [targetWidth, setTargetWidth] = useState();
  /**
   * Hover中のNavに対してStyleを設定
   * @param { HTMLElement } target
   */
  const setTargetStyle = (target) => {
    setTargetLeftPos(target.getBoundingClientRect().left);
    setTargetWidth(target.getBoundingClientRect().width);
  }

  /**
   * 初回レンダリング
   */
  useEffect(() => {
    const target = targetRefs.current[0].current;
    if(target.dataset.select) {
      setSelectedStyle(target);
      setTargetStyle(target);
    }
  }, [])

  /**
   * マウスを外した時に選択されたNavに下線styleを更新
   */
  const setMouseLeaveStyle = () => {
    setTargetLeftPos(selectedLeft);
    setTargetWidth(selectedWidth);
  }

  /**
   * マウスをホバーした時に、選択したNavの情報を下線Styleに適用
   * @param { HTMLElement } target
   * @returns { (target: HTMLElement) => void }
   */
  const setMouseEnterStyle = (target) => setTargetStyle(target);

  /**
   * クリックしたら選択中の対象を変更
   * @param { {name: string isSelected: boolean} } targetData
   * @param { HTMLElement } targetEl
   */
  const updateStatus = (targetData, targetEl) => {
    setData(data.map(item => {
      item.isSelected = false;

      if(item.name === targetData.name) {
        setSelectedStyle(targetEl);
        return {...item, isSelected: true};
      }

      return item;
    }))
  }

  return (
    <S.Nav>
      <S.List>
        {data.map((item, index) => (
          <S.Item
            onMouseEnter={(e) => setMouseEnterStyle(e.currentTarget)}
            onMouseLeave={() => setMouseLeaveStyle()}
            onClick={(e) => updateStatus(item, e.currentTarget)}
            data-select={item.isSelected ? true: false}
            ref={targetRefs.current[index]}
            isSelectedStyle={item.isSelected}
            key={index}
          >
            {item.name}
          </S.Item>
        ))}
      </S.List>
      <S.UnderLine
        width={targetWidth}
        leftPos={targetLeftPos}
      ></S.UnderLine>
    </S.Nav>
  )
}
