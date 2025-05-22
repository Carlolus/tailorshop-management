<div class="primary-background-light toolbar page-edit-toolbar">
    <div class="grid third no-break v-center">

        <div class="action-buttons text-left px-m py-xs">
            <a href="<?php echo e($isDraft ? $page->getParent()->getUrl() : $page->getUrl()); ?>"
               class="text-button text-primary"><?php echo icon('back'); ?><span class="hide-under-l"><?php echo e(trans('common.back')); ?></span></a>
        </div>

        <div class="text-center px-m">
            <div component="dropdown"
                 option:dropdown:move-menu="true"
                 class="dropdown-container draft-display text <?php echo e($draftsEnabled ? '' : 'hidden'); ?>">
                <button type="button" refs="dropdown@toggle" aria-haspopup="true" aria-expanded="false" title="<?php echo e(trans('entities.pages_edit_draft_options')); ?>" class="text-primary text-button py-s px-m"><span refs="page-editor@draftDisplay" class="faded-text"></span>&nbsp; <?php echo icon('more'); ?></button>
                <?php echo icon('check-circle', ['class' => 'text-pos draft-notification svg-icon', 'refs' => 'page-editor@draftDisplayIcon']); ?>
                <ul refs="dropdown@menu" class="dropdown-menu" role="menu">
                    <li>
                        <button refs="page-editor@saveDraft" type="button" class="text-pos icon-item">
                            <?php echo icon('save'); ?>
                            <div><?php echo e(trans('entities.pages_edit_save_draft')); ?></div>
                        </button>
                    </li>
                    <?php if($isDraft): ?>
                        <li>
                            <a href="<?php echo e($model->getUrl('/delete')); ?>" class="text-neg icon-item">
                                <?php echo icon('delete'); ?>
                                <?php echo e(trans('entities.pages_edit_delete_draft')); ?>

                            </a>
                        </li>
                    <?php endif; ?>
                    <li refs="page-editor@discardDraftWrap" class="<?php echo e($isDraftRevision ? '' : 'hidden'); ?>">
                        <button refs="page-editor@discardDraft" type="button" class="text-neg icon-item">
                            <?php echo icon('cancel'); ?>
                            <div><?php echo e(trans('entities.pages_edit_discard_draft')); ?></div>
                        </button>
                    </li>
                    <?php if(userCan('editor-change')): ?>
                        <li>
                            <?php if($editor === 'wysiwyg'): ?>
                                <a href="<?php echo e($model->getUrl($isDraft ? '' : '/edit')); ?>?editor=markdown-clean" refs="page-editor@changeEditor" class="icon-item">
                                    <?php echo icon('swap-horizontal'); ?>
                                    <div>
                                        <?php echo e(trans('entities.pages_edit_switch_to_markdown')); ?>

                                        <br>
                                        <small><?php echo e(trans('entities.pages_edit_switch_to_markdown_clean')); ?></small>
                                    </div>
                                </a>
                                <a href="<?php echo e($model->getUrl($isDraft ? '' : '/edit')); ?>?editor=markdown-stable" refs="page-editor@changeEditor" class="icon-item">
                                    <?php echo icon('swap-horizontal'); ?>
                                    <div>
                                        <?php echo e(trans('entities.pages_edit_switch_to_markdown')); ?>

                                        <br>
                                        <small><?php echo e(trans('entities.pages_edit_switch_to_markdown_stable')); ?></small>
                                    </div>
                                </a>
                            <?php else: ?>
                                <a href="<?php echo e($model->getUrl($isDraft ? '' : '/edit')); ?>?editor=wysiwyg" refs="page-editor@changeEditor" class="icon-item">
                                    <?php echo icon('swap-horizontal'); ?>
                                    <div><?php echo e(trans('entities.pages_edit_switch_to_wysiwyg')); ?></div>
                                </a>
                            <?php endif; ?>
                        </li>
                    <?php endif; ?>
                </ul>
            </div>
        </div>

        <div class="action-buttons px-m py-xs">
            <div component="dropdown" dropdown-move-menu class="dropdown-container">
                <button refs="dropdown@toggle" type="button" aria-haspopup="true" aria-expanded="false" class="text-primary text-button"><?php echo icon('edit'); ?> <span refs="page-editor@changelogDisplay"><?php echo e(trans('entities.pages_edit_set_changelog')); ?></span></button>
                <ul refs="dropdown@menu" class="wide dropdown-menu">
                    <li class="px-l py-m">
                        <p class="text-muted pb-s"><?php echo e(trans('entities.pages_edit_enter_changelog_desc')); ?></p>
                        <input refs="page-editor@changelogInput"
                               name="summary"
                               id="summary-input"
                               type="text"
                               placeholder="<?php echo e(trans('entities.pages_edit_enter_changelog')); ?>" />
                    </li>
                </ul>
                <span></span>
            </div>

            <button type="submit" id="save-button" class="float-left text-primary text-button text-pos-hover hide-under-m"><?php echo icon('save'); ?><span><?php echo e(trans('entities.pages_save')); ?></span></button>
        </div>
    </div>
</div><?php /**PATH /var/www/bookstack/resources/views/pages/parts/editor-toolbar.blade.php ENDPATH**/ ?>