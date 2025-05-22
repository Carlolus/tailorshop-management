<div component="page-editor" class="page-editor flex-fill flex"
     option:page-editor:drafts-enabled="<?php echo e($draftsEnabled ? 'true' : 'false'); ?>"
     <?php if(config('services.drawio')): ?>
        drawio-url="<?php echo e(is_string(config('services.drawio')) ? config('services.drawio') : 'https://embed.diagrams.net/?embed=1&proto=json&spin=1&configure=1'); ?>"
     <?php endif; ?>
     <?php if($model->name === trans('entities.pages_initial_name')): ?>
        option:page-editor:has-default-title="true"
     <?php endif; ?>
     option:page-editor:editor-type="<?php echo e($editor); ?>"
     option:page-editor:page-id="<?php echo e($model->id ?? '0'); ?>"
     option:page-editor:page-new-draft="<?php echo e($isDraft ? 'true' : 'false'); ?>"
     option:page-editor:draft-text="<?php echo e(($isDraft || $isDraftRevision) ? trans('entities.pages_editing_draft') : trans('entities.pages_editing_page')); ?>"
     option:page-editor:autosave-fail-text="<?php echo e(trans('errors.page_draft_autosave_fail')); ?>"
     option:page-editor:editing-page-text="<?php echo e(trans('entities.pages_editing_page')); ?>"
     option:page-editor:draft-discarded-text="<?php echo e(trans('entities.pages_draft_discarded')); ?>"
     option:page-editor:set-changelog-text="<?php echo e(trans('entities.pages_edit_set_changelog')); ?>">

    
    <?php echo $__env->make('pages.parts.editor-toolbar', ['model' => $model, 'editor' => $editor, 'isDraft' => $isDraft, 'draftsEnabled' => $draftsEnabled], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>

    
    <div class="title-input page-title clearfix">
        <div refs="page-editor@titleContainer" class="input">
            <?php echo $__env->make('form.text', ['name' => 'name', 'model' => $model, 'placeholder' => trans('entities.pages_title')], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
        </div>
    </div>

    
    <div class="edit-area flex-fill flex">

        
        <?php if($editor === 'wysiwyg'): ?>
            <?php echo $__env->make('pages.parts.wysiwyg-editor', ['model' => $model], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
        <?php endif; ?>

        
        <?php if($editor === 'markdown'): ?>
            <?php echo $__env->make('pages.parts.markdown-editor', ['model' => $model], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
        <?php endif; ?>

    </div>

    
    <button type="submit"
            id="save-button-mobile"
            title="<?php echo e(trans('entities.pages_save')); ?>"
            class="text-primary text-button hide-over-m page-save-mobile-button"><?php echo icon('save'); ?></button>

    
    <?php $__env->startComponent('common.confirm-dialog', ['title' => trans('entities.pages_editor_switch_title'), 'ref' => 'page-editor@switchDialog']); ?>
        <p>
            <?php echo e(trans('entities.pages_editor_switch_are_you_sure')); ?>

            <br>
            <?php echo e(trans('entities.pages_editor_switch_consider_following')); ?>

        </p>

        <ul>
            <li><?php echo e(trans('entities.pages_editor_switch_consideration_a')); ?></li>
            <li><?php echo e(trans('entities.pages_editor_switch_consideration_b')); ?></li>
            <li><?php echo e(trans('entities.pages_editor_switch_consideration_c')); ?></li>
        </ul>
    <?php echo $__env->renderComponent(); ?>
</div><?php /**PATH /var/www/bookstack/resources/views/pages/parts/form.blade.php ENDPATH**/ ?>