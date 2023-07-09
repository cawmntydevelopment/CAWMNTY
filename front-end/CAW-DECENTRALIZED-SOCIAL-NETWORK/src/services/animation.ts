const animations = [
    {
        name: "CLICK_ANIMATION_1",
        animation: "heartBeat",
        animationDuration: "1s"
    },
]


export const animate = (currentCss: any, selectAnimation: string) => {
    const ANIMATION = animations.find(x => x.name === selectAnimation);
    return {...currentCss,...ANIMATION}
}
