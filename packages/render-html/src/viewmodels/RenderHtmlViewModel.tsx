/**
 * @Project react-native-render-html
 * @File RenderHtmlViewModel.tsx
 * @Path packages/render-html/src/viewmodels
 * @Author BRICE ZELE
 * @Date 06/03/2022
 */

import {Node, parser} from 'posthtml-parser'

interface NodeElement {
    node: Node | any
    isEmbed: boolean
}

export class RenderHtmlViewModel {

    isBlockQuoteTag(node: Node): boolean {
        if (node.hasOwnProperty('tag')) return node.tag === 'blockquote'
        else return false
    }

    isTwitterTag(node: Node): boolean {
        return (
            this.isBlockQuoteTag(node) &&
            node.attrs?.class?.includes('twitter-tweet')
        )
    }

    isEmbedTag(node: Node): boolean {
        if (node.hasOwnProperty('tag') && node.hasOwnProperty('content')) {
            return (
                node.content.filter((element) => element.tag === 'iframe')
                    .length > 0
            )
        } else return false
    }

    hasSpecialTagToEmbed(content: string): boolean {
        const htmlTree = parser(content)
        const predicate = (node: Node) => {
            return (
                this.isTwitterTag(node) ||
                this.isEmbedTag(node) ||
                this.isBlockQuoteTag(node)
            )
        }

        return htmlTree.some(predicate)
    }

    convertContentToNodeOrEmbed(content: string): Array<NodeElement> {
        const htmlTree = parser(content)
        let htmlNode: Array<NodeElement> = []

        htmlTree.map((node) => {
            if (this.isEmbedTag(node)) {
                htmlNode.push({
                    node: node.content,
                    isEmbed: this.isEmbedTag(node),
                })
            } else {
                htmlNode.push({
                    node,
                    isEmbed: this.isTwitterTag(node),
                })
            }
        })

        return htmlNode
    }
}