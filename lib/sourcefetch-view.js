'use babel';

export default class SourcefetchView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('sourcefetch');

    // create a heading
    const heading = document.createElement('div')
    heading.classList.add('heading')
    heading.textContent = "CODE SPAN GUI LIKE CLI"
    
    this.element.appendChild(heading)
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  clearWrapper() {
    const wrapper = document.getElementById('wrapper')
    this.element.removeChild(wrapper)
  }

  setElement(JSONdata) {

    // create a wrapper
    const wrapper = document.createElement('div')
    wrapper.classList.add('wrapper')
    wrapper.setAttribute('id', 'wrapper')

    // const showMore = document.createElement('div');
    // showMore.classList.add('showMore');
    // showMore.textContent = 'Show More';

    // const source = document.createElement('div');
    // source.classList.add('source');
    // const link = document.createElement('a');
    // link.classList.add('link');
    //
    // // assemble them
    // link.textContent = 'https://www.google.com'
    // source.appendChild(link);

    // let globalContentTemp = ''
    for ( let parentCodeIndex=0 ; parentCodeIndex < JSONdata[0].length ; parentCodeIndex++){

      // check to remove bogus datas , basically just random manual threshold
      if (JSONdata[0][parentCodeIndex][1].toString().length < 5) {
        continue
      }

      // create a block for code
      const repeatableUnits = document.createElement('div')
      repeatableUnits.classList.add('repeatableUnits')

      // create 2 wrappers
      const rightWrapper = document.createElement('div')
      rightWrapper.classList.add('rightWrapper')
      const leftWrapper = document.createElement('div')
      leftWrapper.classList.add('leftWrapper')

      // leftWrapper contents
      const upVoteBlock = document.createElement('div')
      upVoteBlock.classList.add('upVoteBlock')
      const downVoteBlock = document.createElement('div')
      downVoteBlock.classList.add('downVoteBlock')
      const bugBlock = document.createElement('div')
      bugBlock.classList.add('bugBlock')
      const copyBlock = document.createElement('div')
      copyBlock.classList.add('copyBlock')
      const pasteBlock = document.createElement('div')
      pasteBlock.classList.add('pasteBlock')

      // src tag
      const copy = document.createElement('img')
      copy.classList.add('copy')
      copyBlock.appendChild(copy)
      // src tag
      const paste = document.createElement('img')
      paste.classList.add('paste')
      pasteBlock.appendChild(paste)
      // src tag
      const bug = document.createElement('img')
      bug.classList.add('bug')
      bugBlock.appendChild(bug)
      // src tag
      const downVote = document.createElement('img')
      downVote.classList.add('downVote')
      downVoteBlock.appendChild(downVote)
      // src tag
      const upVote = document.createElement('img')
      upVote.classList.add('upVote')
      upVoteBlock.appendChild(upVote)

      // code part
      const preBlock = document.createElement('pre')
      preBlock.classList.add('preBlock')

      // url urlBlock
      const urlBlock = document.createElement('div')
      urlBlock.classList.add('urlBlock')

      switch(JSONdata[0][parentCodeIndex][0]) {
        case "one" :
        case "three" :
        case "two" :
          const codeBlock = document.createElement('code')
          codeBlock.classList.add('codeBlock')
          codeBlock.textContent = JSONdata[0][parentCodeIndex][1].join(' ')
          preBlock.appendChild(codeBlock)
          urlBlock.textContent = JSONdata[0][parentCodeIndex][2]
          break;
        default :
      }

      // if ( JSONdata[0][parentCodeIndex].length > 1 ) {
      //   for ( let childCodeIndex=0; childCodeIndex < JSONdata[0][parentCodeIndex].length ; childCodeIndex++) {
      //     const codeBlock = document.createElement('code')
      //     codeBlock.classList.add('codeBlock')
      //     codeBlock.textContent = JSONdata[0][parentCodeIndex][childCodeIndex]
      //     preBlock.appendChild(codeBlock)
      //     urlBlock.textContent = JSONdata[1][parentCodeIndex]
      //     // currentEditor.insertText(JSONdata[0][parentCodeIndex][childCodeIndex])
      //     // currentEditor.insertText('\nthis line is a gap between child codes\n')
      //     // globalContentTemp = globalContentTemp + '\n' + JSONdata[0][parentCodeIndex][childCodeIndex]
      //   }
      //   // currentEditor.insertText('\nthis line is a gap between 2 parent codes\n')
      // } else {
      //   const codeBlock = document.createElement('code')
      //   codeBlock.classList.add('codeBlock');
      //   codeBlock.textContent = JSONdata[0][parentCodeIndex][0]
      //   preBlock.appendChild(codeBlock)
      //   urlBlock.textContent = JSONdata[1][parentCodeIndex]
      //   // currentEditor.insertText(JSONdata[0][parentCodeIndex][0])
      //   // currentEditor.insertText('\nthis line is a gap between 2 parent codes\n')
      //   // globalContentTemp = globalContentTemp + '\n' + JSONdata[parentCodeIndex][0]
      // }

      // attach event listeners
      this.attachEventListenerToLeftWrapper(upVoteBlock,downVoteBlock,bugBlock,copyBlock,pasteBlock,codeBlock);

      rightWrapper.appendChild(preBlock)
      rightWrapper.appendChild(urlBlock)
      leftWrapper.appendChild(upVoteBlock)
      leftWrapper.appendChild(downVoteBlock)
      leftWrapper.appendChild(bugBlock)
      leftWrapper.appendChild(copyBlock)
      leftWrapper.appendChild(pasteBlock)
      repeatableUnits.appendChild(leftWrapper)
      repeatableUnits.appendChild(rightWrapper)
      wrapper.appendChild(repeatableUnits)

    }
    this.element.appendChild(wrapper);
  }

  attachEventListenerToLeftWrapper(up, down, bug, copy, paste, codeBlock) {
    up.addEventListener('click', function() {
      // upvote the code
    });
    down.addEventListener('click', function() {
      // downvote the code
    });
    bug.addEventListener('click', function() {
      // bug is the code
    });
    copy.addEventListener('click', function() {
      // copy the code
      // console.info(preBlock);
      // if( preBlock.childElementCount == 1) {
      //   atom.clipboard.write(preBlock.firstChild.textContent);
      // } else if ( preBlock.childElementCount > 1) {
      //   codeBlocks = preBlock.children;
      //   text = "";
      //   for(let count = 0; count < codeBlocks.length ; count++) {
      //     text = text + '\n' + codeBlocks[count].textContent;
      //   }
      //   atom.clipboard.write(text);
      // }
      atom.clipboard.write(codeBlock.textContent)
    });
    paste.addEventListener('click', function() {
      // upvote the code
      // if( preBlock.childElementCount == 1) {
      //   atom.workspace.getActiveTextEditor().insertText(preBlock.firstChild.textContent);
      // } else if ( preBlock.childElementCount > 1) {
      //   codeBlocks = preBlock.children;
      //   codeBlocks = preBlock.children;
      //   text = "";
      //   for(let count = 0; count < codeBlocks.length ; count++) {
      //     text = text + '\n' + codeBlocks[count].textContent;
      //   }
      //   atom.workspace.getActiveTextEditor().insertText(text);
      // }
      atom.workspace.getActiveTextEditor().insertText(codeBlock.textContent)
    });
  }

  getElement() {
    return this.element;
  }

}
