//部分1
document.querySelector('select').value = 'binary'
Actions.Project.selectType(document.querySelector('select'))
Actions.Project.saveFormatType()
Actions.Project.checkFile()
setTimeout(() => {
    Actions.Project.proceed()
    console.log("p1")
    setTimeout(() => {
        document.getElementsByTagName('select')[4].value = 'Risk Difference'
        document.getElementsByTagName('select')[4].dispatchEvent(new Event('change'))
        setTimeout(() => {
            for (var i = 1; i < document.getElementsByTagName('input').length-1; i++) {
                document.getElementsByTagName('input')[i].click(); 
            }
            setTimeout(() => {
                Actions.ConMat.createMatrix()
                function callback(mutationsList, observer) {
                    for (let mutation of mutationsList) {
                        if (mutation.type === 'childList') {
                            mutation.addedNodes.forEach(node => {
                                if (node.nodeType === 1 && node.matches('button.pull-right.btn.btn-default.btn-pad')) {
                                    console.log('Detected the target button!');
                                    Actions.ConMat.proceed();
                                    observer.disconnect();
                                    console.log("p2")
                                    setTimeout(() => {
                                        document.querySelector('select.mr-sm-2.form-inline.form-control').value = 'meanRule'
                                        Actions.NetRob.selectRule(document.querySelector('select.mr-sm-2.form-inline.form-control'))
                                        Actions.NetRob.proceed()
                                        console.log("p3")
                                        Actions.Pubbias.allLow()
                                        Actions.Pubbias.proceed()
                                        console.log("p4")
                                        document.querySelector('select.mr-sm-2.form-inline.form-control').value = 'meanRule'
                                        Actions.NetIndr.selectRule(document.querySelector('select.mr-sm-2.form-inline.form-control'))
                                        Actions.NetIndr.proceed()
                                        console.log("p5")
                                        setTimeout(() => {
                                            document.querySelector('input#clinImpInput.mr-sm-2.form-inline.form-control').value = 0.2
                                            Actions.Imprecision.setClinImp()
                                            Actions.Imprecision.proceed()
                                            console.log("p6")
                                            Actions.Heterogeneity.proceed()
                                            console.log("p7")
                                            Actions.Incoherence.proceed()
                                            console.log("p8")
                                            setTimeout(() => {
                                                for (var i = 0; i < document.getElementsByTagName('input').length; i++) {
                                                    document.getElementsByTagName('input')[i].click(); 
                                                }
                                                function evaluateConcerns(cell) {
                                                    switch (cell.childNodes[0].nodeValue.trim()) {
                                                        case 'No concerns':
                                                            return 0;
                                                        case 'Some concerns':
                                                            return 1;
                                                        case 'Major concerns':
                                                            return 2;
                                                        default:
                                                            return -1;
                                                    }
                                                }
                                                for (var i = 1; i < document.getElementsByTagName('tr').length; i++) {
                                                    const target = document.getElementsByTagName('tr')[i].cells
                                                    console.log(i)
                                                    if (target.length > 1) {
                                                        const rank = evaluateConcerns(target[2])+Math.max(evaluateConcerns(target[5]),evaluateConcerns(target[6]),evaluateConcerns(target[7]))
                                                        console.log(rank)
                                                        target[8].children[0].value = target[8].children[0].options[rank].value
                                                        Actions.Report.updateReportJudgement(target[8].children[0])()
                                                    }
                                                }
                                            }, 10)
                                        }, 10)
                                    }, 10)
                                }
                            });
                        }
                    }
                }
                const config = { childList: true, subtree: true };
                const observer = new MutationObserver(callback);
                const targetNode = document.body;
                observer.observe(targetNode, config);
                console.log('Observer is set up to detect the button.');
            }, 10)
        }, 10)
    }, 10)
}, 10)

//部分2
Actions.Report.download()
Actions.Router.gotoRoute('project')
Actions.Project.saveProject()
Actions.Router.gotoRoute('report')
for (var i = 0; i < document.querySelector('.alertify-notifier.ajs-top.ajs-right').childNodes.length; i++) {
    document.querySelector('.alertify-notifier.ajs-top.ajs-right').childNodes[i].click()
}
window.print()

//部分3
Actions.Router.gotoRoute('project')
setTimeout(() => {
    document.querySelector('button#projectClear.pull-right.btn.btn-default').click()
    setTimeout(() => {
        document.querySelector('button.ajs-button.ajs-ok').click()
        setTimeout(() => {document.querySelector('button.addprojectbtn2').click()}, 10)
    }, 10)
}, 10)