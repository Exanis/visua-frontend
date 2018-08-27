import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import uuid from 'uuid/v4';
import * as lodash from 'lodash';

import {withStyles} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Drawer from '@material-ui/core/Drawer';
import SaveIcon from '@material-ui/icons/Save';
import Settings from '@material-ui/icons/Settings';
import Snackbar from '../../Library/Snackbar';
import TextField from '@material-ui/core/TextField';
import HandIcon from '@material-ui/icons/TouchApp';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import * as SRD from 'storm-react-diagrams';
import 'storm-react-diagrams/dist/style.min.css';

import * as BlockActions from '../../../store/actions/block';
import * as PipelineActions from '../../../store/actions/pipeline';
import {FormattedMessage, defineMessages, injectIntl} from "react-intl";
import * as NavigationActions from "../../../store/actions/navigation";
import ItemList from '../../Library/ItemsList';

const messages = defineMessages({
    blockNameField: {
        id: 'editor.block.name',
        defaultMessage: 'Block name'
    },
    entryPointField: {
        id: 'editor.entryPoint.field',
        defaultMessage: 'Pipeline entry point'
    }
});

const styles = theme => ({
    container: {
        height: '95%',
        position: 'relative',
    },
    vertical: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    horizontal: {
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: 10,
        alignItems: 'center'
    },
    extends: {
        flexGrow: 1
    },
    diagram: {
        height: '100%',
        backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent)',
        backgroundColor: '#3c3c3c',
        backgroundSize: '50px 50px',
    },
    button: {
        margin: theme.spacing.unit,
        position: 'absolute',
        right: '24px',
        bottom: '40px',
        zIndex: 255
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    hidden: {
        display: 'none',
    },
    padded: {
        padding: 15
    },
    spaced: {
        marginLeft: 10
    }
});

export class EditorPage extends React.Component {
    state = {
        pipeline: {},
        displayAdd: false,
        displaySettings: false,
        selectedBlock: null,
        selectionMenu: {},
        selectEntryPointTarget: null,
        offsetX: false,
        offsetY: false,
        zoom: false,
    };

    componentDidMount() {
        this.props.pipelineActions.setCurrentPipeline(this.props.match.params.pipelineId);
        this.props.blockActions.getAllBlocks();
    }

    componentDidUpdate() {
        if (this.props.pipeline.retrieve.haveResult) {
            if (this.props.pipeline.retrieve.success) {
                this.setState({
                    pipeline: this.props.pipeline.retrieve.pipeline
                });
                this.props.pipelineActions.resetPipelineRetrieveState();
            } else {
                this.props.pipelineActions.resetPipelineRetrieveState();
                this.props.navigationActions.redirect('/home');
            }
        }

        if (this.props.pipeline.modelUpdate.haveResult)
            this.props.pipelineActions.resetPipelineModelUpdate();
    }

    getBlock = (uuid) => lodash.find(this.props.block.all, {uuid: uuid});
    blockToColor = uuid => 'rgb(' + uuid.charCodeAt(0) + ', ' + uuid.charCodeAt(1) + ', ' + uuid.charCodeAt(2) + ')';

    onZoomUpdated = (ev) => {
        this.setState({zoom: ev.zoom});
    };

    onOffsetUpdated = (ev) => {
        this.setState({
            offsetX: ev.offsetX,
            offsetY: ev.offsetY
        });
    };

    createDiagramEngine = () => {
        const engine = new SRD.DiagramEngine();
        engine.installDefaultFactories();

        const model = new SRD.DiagramModel();
        const inputs = {};
        const outputs = {};

        if (this.state.pipeline.model) {
            if (this.state.offsetX !== false && this.state.offsetY !== false)
                model.setOffset(this.state.offsetX, this.state.offsetY);
            if (this.state.zoom !== false)
                model.setZoomLevel(this.state.zoom);
        }

        model.addListener({
            zoomUpdated: this.onZoomUpdated,
            offsetUpdated: this.onOffsetUpdated
        });

        if (this.state.pipeline.model && this.state.pipeline.model.blocks) {
            for (const blockInfo of this.state.pipeline.model.blocks) {
                const block = this.getBlock(blockInfo.block);

                if (block) {
                    const blockData = JSON.parse(block.data);
                    const node = new SRD.DefaultNodeModel(
                        <div onDoubleClick={() => this.setState({
                            selectedBlock: {
                                uuid: blockInfo.uuid,
                                info: blockData
                            }
                        })}>{blockInfo.name}</div>,
                        this.blockToColor(block.uuid)
                    );
                    node.blockId = blockInfo.uuid;
                    node.setPosition(blockInfo.position.x, blockInfo.position.y);

                    inputs[blockInfo.uuid] = {};
                    outputs[blockInfo.uuid] = {};

                    for (const portIn of blockData.dataInput) {
                        inputs[blockInfo.uuid][portIn] = node.addInPort(portIn);
                    }

                    for (const portOut of blockData.dataOutput) {
                        outputs[blockInfo.uuid][portOut] = node.addOutPort(portOut);
                    }
                    model.addNode(node);
                }
            }
        }

        if (this.state.pipeline.model && this.state.pipeline.model.links) {
            for (const linkInfo of this.state.pipeline.model.links) {
                if (outputs[linkInfo.from.uuid] && inputs[linkInfo.to.uuid]) {
                    const linkFrom = outputs[linkInfo.from.uuid][linkInfo.from.port];
                    const linkTo = inputs[linkInfo.to.uuid][linkInfo.to.port];
                    const link = linkFrom.link(linkTo);

                    link.linkId = linkInfo.uuid;
                    model.addLink(link);
                }
            }
        }

        model.addListener({nodesUpdated: this.onRemoveBlock});
        model.addListener({linksUpdated: this.onLinkEvent});
        engine.setDiagramModel(model);
        return engine;
    };

    checkDependencyLoop = (links, passed, current) => {
        const newPassed = [...passed, current];

        if (!links[current])
            return false;

        for (const link of links[current]) {
            if (passed.indexOf(link) !== -1)
                return true;
            if (this.checkDependencyLoop(links, newPassed, link))
                return true;
        }
        return false;
    };

    checkDependency = (linksList, newLink) => {
        const links = {};

        for (const link of linksList) {
            if (!links[link.to.uuid])
                links[link.to.uuid] = [];
            links[link.to.uuid].push(link.from.uuid);
        }

        return this.checkDependencyLoop(links, [], newLink);
    };

    createLink = (ev) => () => {
        if (ev.link.sourcePort === null || ev.link.targetPort === null)
            return;

        if (ev.link.sourcePort.parent.blockId === ev.link.targetPort.parent.blockId)
            return;

        if (this.state.pipeline.model && this.state.pipeline.model.links) {
            const existing = this.state.pipeline.model.links.filter(link => link.to.uuid === ev.link.targetPort.parent.blockId && link.to.port === ev.link.targetPort.label);

            if (existing.length > 0)
                return;
        }
        const linkInfo = {
            uuid: uuid,
            from: {
                uuid: ev.link.sourcePort.parent.blockId,
                port: ev.link.sourcePort.label
            },
            to: {
                uuid: ev.link.targetPort.parent.blockId,
                port: ev.link.targetPort.label
            }
        };

        const pipelineData = {
            ...this.state.pipeline,
            model: {
                ...this.state.pipeline.model,
                links: this.state.pipeline.model.links ? this.state.pipeline.model.links : []
            }
        };

        const checkLinks = [...pipelineData.model.links, linkInfo];

        if (this.checkDependency(checkLinks, linkInfo.to.uuid))
            return;

        pipelineData.model.links.push(linkInfo);

        this.setState({
            pipeline: pipelineData
        });
    };

    deleteLink = (ev) => {
        const pipelineData = {
            ...this.state.pipeline,
            model: {
                ...this.state.pipeline.model,
                links: this.state.pipeline.model.links.filter(link => link.uuid !== ev.link.linkId)
            }
        };

        this.setState({
            pipeline: pipelineData
        });
    };

    onLinkEvent = (ev) => {
        if (ev.isCreated)
            ev.link.addListener({
                sourcePortChanged: this.createLink(ev),
                targetPortChanged: this.createLink(ev),
            });
        else
            this.deleteLink(ev);
    };

    onMoveBlock = (ev) => {
        if (ev instanceof SRD.MoveItemsAction) {
            let elements = this.state.pipeline.model.blocks;

            for (const model of ev.selectionModels) {
                const uuid = model.model.blockId;

                if (uuid) {
                    const baseBlockList = elements.filter(block => block.uuid !== uuid);
                    const oldBlock = lodash.find(elements, {uuid: uuid});

                    oldBlock.position.x = model.model.x;
                    oldBlock.position.y = model.model.y;
                    baseBlockList.push(oldBlock);
                    elements = baseBlockList;
                }
            }

            const pipelineData = {
                ...this.state.pipeline,
                model: {
                    ...this.state.pipeline.model,
                    blocks: elements
                }
            };

            this.setState({pipeline: pipelineData});
        }
    };

    onRemoveBlock = (ev) => {
        if (ev.isCreated)
            return;

        const pipelineData = {
            ...this.state.pipeline,
            model: {
                ...this.state.pipeline.model,
                blocks: this.state.pipeline.model.blocks.filter(block => block.uuid !== ev.node.blockId)
            }
        };

        this.setState({
            pipeline: pipelineData
        });
    };

    onAddBlock = (block) => {
        const blockData = {
            block: block.uuid,
            uuid: uuid(),
            position: {
                x: 100,
                y: 100
            },
            name: block.name,
            vars: {}
        };
        const pipelineData = {
            ...this.state.pipeline,
            model: {
                ...this.state.pipeline.model,
                blocks: this.state.pipeline.model.blocks ? this.state.pipeline.model.blocks : [],
                order: this.state.pipeline.model.order ? this.state.pipeline.model.order : [],
            }
        };

        pipelineData.model.blocks.push(blockData);

        if (!pipelineData.model.entryPoint || !pipelineData.model.blocks.filter(block => block.uuid === pipelineData.model.entryPoint))
            pipelineData.model.entryPoint = blockData.uuid;

        this.setState({
            displayAdd: false,
            pipeline: pipelineData
        });
    };

    savePipeline = () => this.props.pipelineActions.pipelineModelUpdate(this.state.pipeline.uuid, this.state.pipeline.model);

    onEditFormUpdate = (targetBlock, targetVar) => (ev) => {
        const pipelineData = {
            ...this.state.pipeline,
            model: {
                ...this.state.pipeline.model,
                blocks: this.state.pipeline.model.blocks.filter(block => block.uuid !== targetBlock.uuid)
            }
        };

        targetBlock.vars[targetVar] = ev.target.value;
        pipelineData.model.blocks.push(targetBlock);
        this.setState({
            pipeline: pipelineData
        });
    };
    onEditBlockName = (targetBlock) => (ev) => {
        const pipelineData = {
            ...this.state.pipeline,
            model: {
                ...this.state.pipeline.model,
                blocks: this.state.pipeline.model.blocks.filter(block => block.uuid !== targetBlock.uuid)
            }
        };

        if (ev.target.value.indexOf('$') === -1)
            targetBlock.name = ev.target.value;

        if (targetBlock.name === '') {
            const block = this.getBlock(targetBlock.block);

            targetBlock.name = block.name;
        }

        pipelineData.model.blocks.push(targetBlock);
        this.setState({
            pipeline: pipelineData
        });
    };

    setSelectOutputVar = (uuid, v, val) => (ev) => {
        const newMenuOpts = {
            ...this.state.selectionMenu
        };

        newMenuOpts[uuid + '.' + v] = val ? ev.currentTarget : null;
        this.setState({selectionMenu: newMenuOpts});
    };

    createOutputList = () => {
        const result = [];

        for (const block of this.state.pipeline.model.blocks) {
            const baseBlock = this.getBlock(block.block);
            const targetBlock = JSON.parse(baseBlock.data);

            if (targetBlock.varsOutput) {
                for (const varName of targetBlock.varsOutput) {
                    result.push({
                        block: block,
                        varName: varName
                    });
                }
            }
        }
        return result;
    };

    selectInMenu = (targetBlock, targetVar, opt, close) => () => {
        const pipelineData = {
            ...this.state.pipeline,
            model: {
                ...this.state.pipeline.model,
                blocks: this.state.pipeline.model.blocks.filter(block => block.uuid !== targetBlock.uuid)
            }
        };

        targetBlock.vars[targetVar] = '<' + opt.block.name + '$' + opt.varName + '$' + opt.block.uuid + '>';
        pipelineData.model.blocks.push(targetBlock);
        this.setState({
            pipeline: pipelineData
        });
        close();
    };

    getEntryPointName = () => {
        if (!this.state.pipeline.model || !this.state.pipeline.model.entryPoint)
            return '';
        const targetBlock = this.state.pipeline.model.blocks.find(block => block.uuid === this.state.pipeline.model.entryPoint);

        if (!targetBlock)
            return '';
        return targetBlock.name;
    };

    selectEntryPoint = (block) => () => {
        const pipelineData = {
            ...this.state.pipeline,
            model: {
                ...this.state.pipeline.model,
                entryPoint: block.uuid
            }
        };

        this.setState({
            pipeline: pipelineData,
            selectEntryPointTarget: null
        });
    };

    renderEditForm = () => {
        if (this.state.selectedBlock === null)
            return false;

        const {formatMessage} = this.props.intl;
        const targetBlock = this.state.pipeline.model.blocks.find(b => b.uuid === this.state.selectedBlock.uuid);
        const content = this.state.selectedBlock.info.varsInput.map(v => <div className={this.props.classes.horizontal}>
            <TextField
                label={v}
                value={targetBlock.vars[v]}
                onChange={this.onEditFormUpdate(targetBlock, v)}
                className={this.props.classes.extends}
            />
            <IconButton variant='contained' onClick={this.setSelectOutputVar(targetBlock.uuid, v, true)}>
                <HandIcon/>
            </IconButton>
            <Menu
                open={Boolean(this.state.selectionMenu[targetBlock.uuid + '.' + v])}
                anchorEl={this.state.selectionMenu[targetBlock.uuid + '.' + v]}
                onClose={this.setSelectOutputVar(targetBlock.uuid, v, false)}
            >
                {
                    this.createOutputList().map(opt => {
                        return <MenuItem key={opt.block.uuid + '.' + opt.varName}
                                         onClick={this.selectInMenu(targetBlock, v, opt, this.setSelectOutputVar(targetBlock.uuid, v, false))}>
                            {opt.block.name}: {opt.varName}
                        </MenuItem>;
                    })
                }
            </Menu>
        </div>);

        return <div className={this.props.classes.vertical}>
            <TextField
                label={formatMessage(messages.blockNameField)}
                value={targetBlock.name}
                onChange={this.onEditBlockName(targetBlock)}
            />
            {content}
        </div>
    };

    render() {
        const {formatMessage} = this.props.intl;

        return <div className={this.props.classes.container}>
            <Button variant="fab" color="primary" onClick={() => this.setState({displayAdd: true})}
                    className={this.state.displaySettings || this.state.displayAdd || this.state.selectedBlock !== null ? this.props.classes.hidden : this.props.classes.button}>
                <AddIcon/>
            </Button>
            <Snackbar open={this.props.pipeline.modelUpdate.haveResult && !this.props.pipeline.modelUpdate.success}
                      variant={'error'}>
                <FormattedMessage
                    id={'pipeline.model.update.error'}
                    defaultMessage={'Error while saving pipeline; please try again (are you still logged in?)'}
                />
            </Snackbar>
            <Snackbar open={this.props.pipeline.modelUpdate.haveResult && this.props.pipeline.modelUpdate.success}
                      variant={'success'}>
                <FormattedMessage
                    id={'pipeline.model.update.success'}
                    defaultMessage={'Pipeline saved.'}
                />
            </Snackbar>
            <Drawer anchor={'right'} open={this.state.selectedBlock !== null}
                    onClose={() => this.setState({selectedBlock: null})}>
                <div className={this.props.classes.padded}>
                    <div className={this.props.classes.vertical}>
                        <Typography variant='title'>
                            <FormattedMessage
                                id={'pipeline.model.settings.title'}
                                defaultMessage={'Block settings'}
                            />
                        </Typography><br/>
                        {this.renderEditForm()}
                    </div>
                </div>
            </Drawer>
            <Drawer anchor={'right'} open={this.state.displaySettings}
                    onClose={() => this.setState({displaySettings: false})}>
                <div className={this.props.classes.padded}>
                    <div className={this.props.classes.vertical}>
                        <Typography variant='title'>
                            <FormattedMessage
                                id={'pipeline.model.pipelineSettings.title'}
                                defaultMessage={'Pipeline settings'}
                            />
                        </Typography><br/>
                        <List component='nav'>
                            <ListItem
                                button
                                aria-haspopup={true}
                                aria-controls='lock-menu'
                                onClick={(ev) => this.setState({selectEntryPointTarget: ev.currentTarget})}
                            >
                                <ListItemText
                                    primary={formatMessage(messages.entryPointField)}
                                    secondary={this.getEntryPointName()}
                                />
                            </ListItem>
                        </List>
                        <Menu
                            anchorEl={this.state.selectEntryPointTarget}
                            open={Boolean(this.state.selectEntryPointTarget)}
                            onClose={() => this.setState({selectEntryPointTarget: null})}
                        >
                            {this.state.pipeline && this.state.pipeline.model && this.state.pipeline.model.blocks && this.state.pipeline.model.blocks.map(block =>
                                <MenuItem key={block.uuid} selected={this.state.pipeline.entryPoint === block.uuid}
                                          onClick={this.selectEntryPoint(block)}>
                                    {block.name}
                                </MenuItem>)}
                        </Menu>
                    </div>
                </div>
            </Drawer>
            <Drawer anchor={'right'} open={this.state.displayAdd} onClose={() => this.setState({displayAdd: false})}>
                <div className={this.props.classes.padded}>
                    <ItemList
                        title={''}
                        itemToPrimary={(item) => item.name}
                        itemToSecondary={() => false}
                        count={this.props.block.count}
                        items={this.props.block.block}
                        loaded={this.props.block.loaded}
                        loadItems={this.props.blockActions.getBlockList}
                        onClick={this.onAddBlock}
                    />
                </div>
            </Drawer>
            <div className={this.props.classes.vertical}>
                <div className={this.props.classes.horizontal}>
                    <Typography variant={'title'} className={this.props.classes.extends}>
                        {this.state.pipeline.name}
                    </Typography>
                    <Button color='primary' onClick={() => this.setState({displaySettings: true})}
                            className={this.props.classes.spaced}>
                        <Settings className={this.props.classes.leftIcon}/>
                        <FormattedMessage
                            id={'editor.settings'}
                            defaultMessage={'Settings'}
                        />
                    </Button>
                    <Button color='primary' onClick={this.savePipeline} variant="contained"
                            className={this.props.classes.spaced}>
                        <SaveIcon className={this.props.classes.leftIcon}/>
                        <FormattedMessage
                            id={'editor.save'}
                            defaultMessage={'Save'}
                        />
                    </Button>
                </div>
                <SRD.DiagramWidget actionStoppedFiring={this.onMoveBlock} maxNumberPointsPerLink={0}
                                   diagramEngine={this.createDiagramEngine()} className={this.props.classes.diagram}/>
            </div>
        </div>;
    }
}

const mapStateToProps = state => {
    return {
        pipeline: state.pipeline,
        block: state.block,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        blockActions: bindActionCreators(BlockActions, dispatch),
        pipelineActions: bindActionCreators(PipelineActions, dispatch),
        navigationActions: bindActionCreators(NavigationActions, dispatch),
    }
};

const Editor = connect(mapStateToProps, mapDispatchToProps)(injectIntl(withStyles(styles)(EditorPage)));

Editor.propsType = {};

export default Editor;
