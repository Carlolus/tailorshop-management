<div editor-toolbox class="floating-toolbox">

    <div class="tabs primary-background-light">
        <button type="button" toolbox-toggle aria-expanded="false"><?php echo icon('caret-left-circle'); ?></button>
        <button type="button" toolbox-tab-button="tags" title="<?php echo e(trans('entities.page_tags')); ?>" class="active"><?php echo icon('tag'); ?></button>
        <?php if(userCan('attachment-create-all')): ?>
            <button type="button" toolbox-tab-button="files" title="<?php echo e(trans('entities.attachments')); ?>"><?php echo icon('attach'); ?></button>
        <?php endif; ?>
        <button type="button" toolbox-tab-button="templates" title="<?php echo e(trans('entities.templates')); ?>"><?php echo icon('template'); ?></button>
    </div>

    <div toolbox-tab-content="tags">
        <h4><?php echo e(trans('entities.page_tags')); ?></h4>
        <div class="px-l">
            <?php echo $__env->make('entities.tag-manager', ['entity' => $page], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
        </div>
    </div>

    <?php if(userCan('attachment-create-all')): ?>
        <?php echo $__env->make('attachments.manager', ['page' => $page], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
    <?php endif; ?>

    <div toolbox-tab-content="templates">
        <h4><?php echo e(trans('entities.templates')); ?></h4>

        <div class="px-l">
            <?php echo $__env->make('pages.parts.template-manager', ['page' => $page, 'templates' => $templates], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
        </div>

    </div>

</div>
<?php /**PATH /var/www/bookstack/resources/views/pages/parts/editor-toolbox.blade.php ENDPATH**/ ?>