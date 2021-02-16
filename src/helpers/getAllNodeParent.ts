// techfoobar's answer in StackOverflow
// https://stackoverflow.com/questions/8729193/how-to-get-all-parent-nodes-of-given-element-in-pure-javascript?rq=1
export default function getAllNodeParent (element: Node & ParentNode): Node[] {
    const nodes = []
    nodes.push(element)
    while(element.parentNode) {
        nodes.unshift(element.parentNode)
        element = element.parentNode
    }
    return nodes
}
