import React from 'react'
import BraftEditor from 'braft-editor'
import { Card, message } from 'antd'
import PageLayout from '@/components/PageLayout'

import 'braft-editor/dist/index.css'

export default class EditorDemo extends React.Component {

  state = {
    editorState: null
  }

  async componentDidMount() {

  }

  submitContent = async () => {
    // Pressing ctrl + s when the editor has focus will execute this method
    // Before the editor content is submitted to the server, you can directly call editorState.toHTML () to get the HTML content
    const htmlContent = this.state.editorState.toHTML()
    message.success('已保存！')
    console.log(this.state.editorState.toRAW(), htmlContent)
  }

  handleEditorChange = (editorState) => {
    this.setState({ editorState })
  }

  render() {
    const { editorState } = this.state

    return (
      <PageLayout routes={[{ path: '/editor', breadcrumbName: '文本编辑器' }]} title="文本编辑器">
        <Card bordered={false}>
          <BraftEditor
            value={editorState}
            onChange={this.handleEditorChange}
            onSave={this.submitContent}
          />
        </Card>
      </PageLayout>
    )
  }
}
